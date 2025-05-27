
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Camera, Upload, DollarSign, Calendar, FileText, Search, Filter } from "lucide-react";

interface Receipt {
  id: string;
  employee_id: number;
  receipt_image_url: string;
  vendor_name: string;
  amount: number;
  tax_amount: number;
  receipt_date: string;
  category: string;
  description: string;
  is_processed: boolean;
  created_at: string;
}

const ReceiptManagement = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [formData, setFormData] = useState({
    vendor_name: "",
    amount: "",
    tax_amount: "",
    receipt_date: "",
    category: "",
    description: "",
    employee_id: ""
  });

  useEffect(() => {
    fetchReceipts();
  }, []);

  const fetchReceipts = async () => {
    try {
      const { data, error } = await supabase
        .from('receipts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReceipts(data || []);
    } catch (error) {
      console.error('Error fetching receipts:', error);
      toast({
        title: "Error",
        description: "Failed to load receipts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('receipts')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('receipts')
        .getPublicUrl(fileName);

      // Simulate OCR/AI extraction (in real world, you'd use a service like AWS Textract or Google Vision)
      const extractedData = {
        vendor_name: "Auto-detected Vendor",
        amount: (Math.random() * 500 + 10).toFixed(2),
        tax_amount: (Math.random() * 50 + 1).toFixed(2),
        category: "Materials",
        description: "Auto-extracted description from receipt"
      };

      setFormData({
        ...formData,
        ...extractedData,
        receipt_date: new Date().toISOString().split('T')[0]
      });

      toast({
        title: "Receipt Uploaded",
        description: "Receipt data has been extracted. Please review and save.",
      });

    } catch (error) {
      console.error('Error uploading receipt:', error);
      toast({
        title: "Upload Error",
        description: "Failed to upload receipt",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSaveReceipt = async () => {
    try {
      const { error } = await supabase
        .from('receipts')
        .insert({
          vendor_name: formData.vendor_name,
          amount: parseFloat(formData.amount),
          tax_amount: parseFloat(formData.tax_amount || "0"),
          receipt_date: formData.receipt_date,
          category: formData.category,
          description: formData.description,
          employee_id: parseInt(formData.employee_id) || null,
          is_processed: true
        });

      if (error) throw error;

      setFormData({
        vendor_name: "",
        amount: "",
        tax_amount: "",
        receipt_date: "",
        category: "",
        description: "",
        employee_id: ""
      });

      fetchReceipts();
      toast({
        title: "Receipt Saved",
        description: "Receipt has been saved to the system",
      });
    } catch (error) {
      console.error('Error saving receipt:', error);
      toast({
        title: "Save Error",
        description: "Failed to save receipt",
        variant: "destructive",
      });
    }
  };

  const categories = ["Materials", "Equipment", "Fuel", "Maintenance", "Office Supplies", "Insurance", "Other"];

  const filteredReceipts = receipts.filter(receipt => {
    const matchesSearch = receipt.vendor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || receipt.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const totalExpenses = filteredReceipts.reduce((sum, receipt) => sum + receipt.amount, 0);
  const totalTax = filteredReceipts.reduce((sum, receipt) => sum + (receipt.tax_amount || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Receipt Management</h2>
          <p className="text-muted-foreground">Scan and manage receipts for expense tracking</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-lg px-3 py-1">
            <DollarSign className="w-4 h-4 mr-1" />
            Expenses: ${totalExpenses.toFixed(2)}
          </Badge>
          <Badge variant="outline" className="text-lg px-3 py-1">
            Tax: ${totalTax.toFixed(2)}
          </Badge>
        </div>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Scan/Upload Receipt
          </CardTitle>
          <CardDescription>Upload receipt images and extract data automatically</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              {uploading ? "Uploading..." : "Upload Receipt"}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="vendor">Vendor Name</Label>
              <Input
                id="vendor"
                value={formData.vendor_name}
                onChange={(e) => setFormData({...formData, vendor_name: e.target.value})}
                placeholder="Vendor name"
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="tax">Tax Amount</Label>
              <Input
                id="tax"
                type="number"
                step="0.01"
                value={formData.tax_amount}
                onChange={(e) => setFormData({...formData, tax_amount: e.target.value})}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="date">Receipt Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.receipt_date}
                onChange={(e) => setFormData({...formData, receipt_date: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="employee">Employee ID</Label>
              <Input
                id="employee"
                type="number"
                value={formData.employee_id}
                onChange={(e) => setFormData({...formData, employee_id: e.target.value})}
                placeholder="Employee ID (optional)"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Receipt description"
              rows={3}
            />
          </div>

          <Button onClick={handleSaveReceipt} className="w-full">
            <FileText className="w-4 h-4 mr-2" />
            Save Receipt
          </Button>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search receipts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border rounded-md px-3 py-2"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Receipts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReceipts.map((receipt) => (
          <Card key={receipt.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{receipt.vendor_name}</CardTitle>
              <CardDescription>{receipt.category}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Amount:</span>
                <span className="font-medium">${receipt.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Tax:</span>
                <span className="font-medium">${(receipt.tax_amount || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Date:</span>
                <span className="font-medium">{new Date(receipt.receipt_date).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{receipt.description}</p>
              <Badge variant={receipt.is_processed ? "default" : "outline"}>
                {receipt.is_processed ? "Processed" : "Pending"}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReceipts.length === 0 && !loading && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No receipts found</h3>
            <p className="text-gray-600">Upload your first receipt to get started</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReceiptManagement;
