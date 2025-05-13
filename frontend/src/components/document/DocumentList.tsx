import React, { useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { DocumentContext } from '../../contexts/DocumentContext';
import { ProcessContext } from '../../contexts/ProcessContext';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, Trash2, Search, Filter, Edit } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export default function DocumentList() {
  const { documents, deleteDocument, editDocument } = useContext(DocumentContext);
  const { processes } = useContext(ProcessContext);
  const navigate = useNavigate();

  // États pour le filtrage et la recherche
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState(documents);
  const [editingDocument, setEditingDocument] = useState(null);

  // Liste des statuts possibles
  const allStatuses = ['brouillon', 'envoyé', 'validé', 'à modifier'];

  // Obtenir le nom du processus à partir de son ID
  const getProcessName = (processId) => {
    const process = processes.find(p => p.id === processId);
    return process ? process.name : 'Processus inconnu';
  };

  // Je simule un fetch api qui recupere les postessources
  const [ posteSources, setPosteSources ] = useState([]);
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
  const getPosteSourceName = (posteSourceId) => {
    const posteSource = posteSources.find(p => p.id === posteSources);
    return posteSource ? posteSource.name : 'Poste source inconnu'
  }

   // Formater le statut pour l'affichage
   const getStatusBadge = (status) => {
    switch (status) {
      case 'brouillon':
        return <Badge variant="outline">Brouillon</Badge>;
      case 'envoyé':
        return <Badge variant="default">Envoyé</Badge>;
      case 'validé':
        return <Badge variant="success">Validé</Badge>;
      case 'à modifier':
        return <Badge className="bg-orange-100 text-orange-600">À modifier</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Rediriger vers la page détaillée du document
  const handleViewDocument = (documentId) => {
    navigate(`/document/${documentId}`);
  };

  const handleEdit = (document) => {
    set
  }

  // Filtrer les documents à chaque changement de recherche ou de filtres
  useEffect(() => {
    const filtered = documents.filter(doc => {
      // Filtrage par nom ou processus
      const matchesSearch = searchTerm === '' || 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getProcessName(doc.processId).toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtrage par statut
      const matchesStatus = statusFilter.length === 0 || statusFilter.includes(doc.status);
      
      return matchesSearch && matchesStatus;
    });
    
    setFilteredDocuments(filtered);
  }, [documents, searchTerm, statusFilter]);

  // Gérer le changement d'état du filtre de statut
  const handleStatusFilterChange = (status) => {
    setStatusFilter(current => {
      if (current.includes(status)) {
        return current.filter(s => s !== status);
      } else {
        return [...current, status];
      }
    });
  };

  // Effacer tous les filtres
  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter([]);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Liste des documents</h2>
      
      {/* Barre de recherche et filtres */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Rechercher par nom ou processus..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} />
                <span>Statut</span>
                {statusFilter.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {statusFilter.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {allStatuses.map(status => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={statusFilter.includes(status)}
                  onCheckedChange={() => handleStatusFilterChange(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {(searchTerm || statusFilter.length > 0) && (
            <Button variant="ghost" onClick={clearFilters}>
              Effacer
            </Button>
          )}
        </div>
      </div>
      
      {filteredDocuments.length === 0 ? (
        <div className="py-05 text-center text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          {documents.length === 0 ? (
            <div>
              <p className="mb-2">Aucun document disponible.</p>
              <p>Créez votre premier document !</p>
            </div>
          ) : (
            <div>
              <p className="mb-2">Aucun document ne correspond à votre recherche.</p>
              <Button variant="link" onClick={clearFilters}>Effacer les filtres</Button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((doc) => (
            <Card 
              key={doc.id} 
              className="overflow-hidden transition-all hover:shadow-md cursor-pointer"
              onClick={() => handleViewDocument(doc.id)}
            >
              <div className="h-3" style={{
                backgroundColor: 
                  doc.status === 'validé' ? '#43A047' : 
                  doc.status === 'envoyé' ? '#1422db' :
                  doc.status === 'à modifier' ? '#FB8C00' :
                  '#94A3B8' // pour brouillon
              }}/>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-medium text-lg truncate" title={doc.name}>
                    {doc.name}
                  </h3>
                  {getStatusBadge(doc.status)}
                </div>
                
                <div className="text-sm text-gray-500 space-y-1 mb-4">
                  <div className="flex justify-between">
                    <span>Poste Source:</span>
                    <span className="font-medium text-gray-700">{getPosteSourceName(doc.posteSource)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Entreprise:</span>
                    <span className="font-medium text-gray-700">{doc.entrepriseIntervenante ?? "Non Renseigné"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processus:</span>
                    <span className="font-small text-gray-700">{getProcessName(doc.processId)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date début:</span>
                    <span>{format(new Date(doc.startDate), 'dd MMM yyyy', { locale: fr })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date fin:</span>
                    <span>{format(new Date(doc.endDate), 'dd MMM yyyy', { locale: fr })}</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="bg-gray-50 flex justify-between pt-3 pb-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-blue-600 hover:text-blue-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDocument(doc.id);
                  }}
                >
                  <Eye size={16} className="mr-1"/>
                  Consulter
                </Button>
                
                <div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-grey-600 hover:text-grey-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      editDocument(doc.id);
                    }}
                  >
                    <Edit size={16} className="mr-1" />
                  </Button>

                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-600 hover:text-red-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteDocument(doc.id);
                    }}
                  >
                    <Trash2 size={16} className="mr-1" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}