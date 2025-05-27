
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Download, FileText, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DocumentType {
  id: string;
  document_type: string;
  file_name: string;
  file_path: string;
  file_size: number;
  uploaded_at: string;
}

interface DocumentUploadProps {
  employeeId: number;
  documents: DocumentType[];
  onDocumentUploaded: () => void;
}

const DocumentUpload = ({ employeeId, documents, onDocumentUploaded }: DocumentUploadProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState<string | null>(null);

  const documentTypes = [
    { key: 'handbook', label: 'Employee Handbook', description: 'Company policies and guidelines' },
    { key: 'contract', label: 'Employment Contract', description: 'Signed employment agreement' },
    { key: 'w2_blank', label: 'Blank W-2 Form', description: 'Template W-2 form for completion' },
    { key: 'w2_filled', label: 'Completed W-2', description: 'Filled and processed W-2 form' }
  ];

  const handleFileUpload = async (file: File, documentType: string) => {
    if (!file) return;

    setUploading(documentType);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${employeeId}/${documentType}/${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('employee-documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Save document metadata to database
      const { error: dbError } = await supabase
        .from('employee_documents')
        .insert({
          employee_id: employeeId,
          document_type: documentType,
          file_name: file.name,
          file_path: uploadData.path,
          file_size: file.size,
          mime_type: file.type
        });

      if (dbError) throw dbError;

      toast({
        title: "Document Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });

      onDocumentUploaded();
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(null);
    }
  };

  const handleDownload = async (document: DocumentType) => {
    try {
      const { data, error } = await supabase.storage
        .from('employee-documents')
        .download(document.file_path);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const link = window.document.createElement('a');
      link.href = url;
      link.download = document.file_name;
      link.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Download Started",
        description: `${document.file_name} is being downloaded.`,
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: "Failed to download document. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (document: DocumentType) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('employee-documents')
        .remove([document.file_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('employee_documents')
        .delete()
        .eq('id', document.id);

      if (dbError) throw dbError;

      toast({
        title: "Document Deleted",
        description: `${document.file_name} has been deleted.`,
      });

      onDocumentUploaded();
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete document. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getDocumentsByType = (type: string) => {
    return documents.filter(doc => doc.document_type === type);
  };

  return (
    <div className="space-y-6">
      {documentTypes.map((docType) => {
        const typeDocuments = getDocumentsByType(docType.key);
        const isUploading = uploading === docType.key;

        return (
          <Card key={docType.key} className="border-l-4 border-l-purple-500">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-600" />
                    {docType.label}
                  </CardTitle>
                  <CardDescription>{docType.description}</CardDescription>
                </div>
                <Badge variant={typeDocuments.length > 0 ? "default" : "outline"}>
                  {typeDocuments.length} file{typeDocuments.length !== 1 ? 's' : ''}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Upload Section */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <Label htmlFor={`upload-${docType.key}`} className="block text-center cursor-pointer">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-8 h-8 text-gray-400" />
                    <span className="text-sm font-medium">
                      {isUploading ? 'Uploading...' : `Upload ${docType.label}`}
                    </span>
                  </div>
                </Label>
                <Input
                  id={`upload-${docType.key}`}
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  disabled={isUploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, docType.key);
                  }}
                />
              </div>

              {/* Existing Documents */}
              {typeDocuments.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-gray-700">Uploaded Files:</h4>
                  {typeDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="font-medium text-sm">{doc.file_name}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(doc.uploaded_at).toLocaleDateString()} • {(doc.file_size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" onClick={() => handleDownload(doc)}>
                          <Download className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDelete(doc)}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DocumentUpload;
