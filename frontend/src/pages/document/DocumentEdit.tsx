import DocumentForm from '../../components/document/DocumentForm'
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react'
import { DocumentContext } from '../../contexts/DocumentContext';

type Props = {
    document: Document;
};

export default function DocumentEditor () {
    const { id } = useParams();
    const { documents } = useContext(DocumentContext);

    const documentExists = documents.some(doc => doc.id === id);

    return (
      <p>{documents.id}</p>
    );
}