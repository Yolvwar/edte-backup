import React, { useState, useContext, useEffect } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DocumentContext } from '../../contexts/DocumentContext';
import { ProcessContext } from '../../contexts/ProcessContext';
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import DateRangePicker from "@/components/daterange-picker";
import UploadFiles from "@/components/upload-files";
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ArrowRight, CheckCircle, Circle } from 'lucide-react';
import AlertPopup from '../alert/alertPopup.tsx'

export default function DocumentForm() {
  const { addDocument } = useContext(DocumentContext);
  const { processes, services } = useContext(ProcessContext);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [showAlert, setShowAlert] = useState(false);

  const [ posteSources, setPosteSources ] = useState([]);
  // Je simule un fetch api qui recupere les postessources
  useEffect(()=> {
    setPosteSources([
      {
      id: '1',
      name: 'Cergy-Pontoise'
      },
      {
        id: '2',
        name: 'Nanterre-Prefecture'
      }
    ]);
  }, []);

  const [document, setDocument] = useState({
    name: '',
    file: null,
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    processId: '',
    status: 'brouillon',
    currentStepId: null,
    history: [],
    ouvrageImpacte: "",
    descriptionDemande: "",
    nomChargeTravaux: "",
    telephoneChargeTravaux: "",
    entrepriseIntervenante: "",
    horsDelais: false,
    posteSource: ""
  });
  
  const selectedProcess = processes.find(p => p.id === document.processId);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDocument((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleFileChange = (e) => {
    setDocument({ ...document, file: e.target.files[0] });
  };
  
  const handleStartDateChange = (date) => {
    setDocument({ ...document, startDate: date });
  };
  
  const handleEndDateChange = (date) => {
    setDocument({ ...document, endDate: date });
  };
  
  const handleProcessChange = (value) => {
    const selectedProcess = processes.find(p => p.id === value);
    setDocument({ 
      ...document, 
      processId: value,
      currentStepId: selectedProcess?.steps[0]?.id || null
    });
  };

  const handlePosteSourceChange = (value) => {
    const selectedPosteSource = posteSources.find(p => p.id === value);
    setDocument({
      ...document,
      posteSource: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
      // Ajoutez le document avec toutes les valeurs
      addDocument(document);

      setAlert({ type: 'success', message: 'Le document a été créé avec succès.' });
      setShowAlert(true);
      // Réinitialiser le formulaire
      setDocument({
        name: '',
        file: null,
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        processId: '',
        status: 'brouillon',
        currentStepId: null,
        history: [],
        ouvrageImpacte: '',
        descriptionDemande: '',
        nomChargeTravaux: '',
        telephoneChargeTravaux: '',
        entrepriseIntervenante: '',
        horsDelais: false,
    });
    } catch (error) {
      setAlert({ type: 'error', message: 'Une erreur est survenue lors de la création du document.' });
      setShowAlert(true);
    }
    setTimeout(() => setShowAlert(false), 5000);
  };

  const getServiceName = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    return service ? service.name : 'Service non spécifié';
  };
  
  return (
    <div className="relative">
      {/* Alerte en haut de l'écran */}
      {showAlert && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50 w-[20%]">
          <AlertPopup status="success" message="Le document a été créé avec succès !"/>
          </div>
      )}

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Créer un nouveau document (DTE)</CardTitle>
          <CardDescription>Remplissez tous les champs nécessaires pour créer une Demande de Travaux d'Exploitation</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Intitulé de l'intervention</Label>
              <Input 
                id="name" 
                name="name" 
                value={document.name} 
                onChange={handleInputChange} 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="processId">Processus de validation</Label>
              <Select 
                value={document.processId} 
                onValueChange={handleProcessChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un processus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">
                    Aucun processus
                  </SelectItem>
                  {processes.map(process => (
                    <SelectItem key={process.id} value={process.id}>
                      {process.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedProcess && (
            <div className="mt-6 border rounded-lg p-4 bg-gray-50">
              <h3 className="font-medium text-sm mb-3">Prévisualisation du processus : {selectedProcess.name}</h3>
              
              <div className="text-xs text-gray-500 mb-3">
                <span className="block">Service responsable : {getServiceName(selectedProcess.serviceId)}</span>
                {selectedProcess.description && (
                  <span className="block mt-1">Description : {selectedProcess.description}</span>
                )}
              </div>
              
              {/* Schéma du workflow */}
              <div className="flex items-center justify-between">
                {selectedProcess.steps.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center text-center w-32">
                      {index === 0 ? (
                        <Circle className="h-7 w-7 text-blue-500 mb-2 fill-blue-100" />
                      ) : (
                        <Circle className="h-7 w-7 text-gray-300 mb-2" />
                      )}
                      <span className="font-medium text-sm">{step.name}</span>
                      <span className="text-xs text-gray-500">{getServiceName(step.serviceId)}</span>
                      {!step.isRequired && (
                        <span className="text-xs text-amber-600 mt-1">(Optionnelle)</span>
                      )}
                    </div>
                    
                    {index < selectedProcess.steps.length - 1 && (
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    )}
                  </React.Fragment>
                ))}
              </div>
              
              {selectedProcess.steps.length === 0 && (
                <div className="text-center py-3 text-amber-600">
                  Attention : Ce processus ne contient aucune étape de validation.
                </div>
              )}
            </div>
          )}


            <div className="grid grid-cols-2 gap-4">      
              <div className="space-y-2">
                <Label htmlFor="entrepriseIntervenante">Nom de l'entreprise intervenante</Label>
                <Input 
                  id="entrepriseIntervenante" 
                  name="entrepriseIntervenante" 
                  value={document.entrepriseIntervenante} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="posteSource">Poste Source</Label>
                <Select 
                  value={document.posteSource} 
                  onValueChange={handlePosteSourceChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un poste source" />
                  </SelectTrigger>
                  <SelectContent>
                    {posteSources.map(posteSource => (
                      <SelectItem key={posteSource.id} value={posteSource.id}>
                        {posteSource.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nomChargeTravaux">Nom du chargé de travaux</Label>
                <Input 
                  id="nomChargeTravaux" 
                  name="nomChargeTravaux" 
                  value={document.nomChargeTravaux} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telephoneChargeTravaux">Téléphone du chargé de travaux</Label>
                <Input 
                  id="telephoneChargeTravaux" 
                  name="telephoneChargeTravaux" 
                  value={document.telephoneChargeTravaux} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <DateRangePicker/>
              </div>

              <div className="space-y-2">
              <Label htmlFor="ouvrageImpacte" className="font-medium">
                Ouvrage impacté
              </Label>
              <Input
                id="ouvrageImpacte"
                name="ouvrageImpacte"
                value={document.ouvrageImpacte}
                onChange={handleInputChange}
              />
              </div>
            </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="descriptionDemande" className="font-medium">
                  Description de la demande
                </Label>
                <Textarea
                  id="descriptionDemande"
                  name="descriptionDemande"
                  value={document.descriptionDemande}
                  onChange={handleInputChange}
                  className="w-full min-h-24"
                />
              </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="pieceJointe" className="font-medium">
                Pièces jointes (Pdf ou Word)
              </Label>
              <div onClick={(e) => e.stopPropagation()} className="w-full">
                <UploadFiles/>
              </div>
            </div>
            
            <Button type="submit" className="w-full">Créer le document</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}