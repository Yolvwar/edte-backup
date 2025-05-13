import React, { useState } from "react";
import { X, CalendarIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import UploadFiles from "@/components/upload-files";
import DateRangePicker from "@/components/daterange-picker";
import DocumentForm from "@/components/document/DocumentForm";

const DTEModal = ({ open, onOpenChange }) => {
  const [formData, setFormData] = useState({
    intitule: "",
    processus: "",
    dateDebut: null,
    dateFin: null,
    horsDelais: false,
    entrepriseIntervenante: "",
    nomChargeTravaux: "",
    telephoneChargeTravaux: "",
    ouvrageImpacte: "",
    descriptionDemande: "",
    pieceJointe: null,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        pieceJointe: e.target.files[0],
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données soumises:", formData);
    // Logique pour créer la DTE
    onOpenChange(false);
  };

  const processusList = [
    { id: "130874311", label: "FSDUM" },
    { id: "130874312", label: "Montigny" },
    { id: "130874313", label: "Nanterre" },
    { id: "130874314", label: "SOA" },
    { id: "130874316", label: "FES" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto scrollbar-thin">
        <DocumentForm />
      </DialogContent>
    </Dialog>
  );
};

export default DTEModal;