
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Eye, Folder } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  description: string;
  type: 'PDF' | 'Image' | 'Doc';
  category: string;
  size: string;
  lastUpdated: string;
}

const Documents = () => {
  const documents: Document[] = [
    {
      id: '1',
      title: 'Store Operations Manual',
      description: 'Complete guide for daily store operations',
      type: 'PDF',
      category: 'SOPs',
      size: '2.3 MB',
      lastUpdated: '2024-01-10'
    },
    {
      id: '2',
      title: 'Daily Audit Checklist',
      description: 'Checklist for daily store audit procedures',
      type: 'PDF',
      category: 'Checklists',
      size: '0.8 MB',
      lastUpdated: '2024-01-08'
    },
    {
      id: '3',
      title: 'Customer Service Guidelines',
      description: 'Best practices for customer interaction',
      type: 'PDF',
      category: 'Policies',
      size: '1.5 MB',
      lastUpdated: '2024-01-05'
    },
    {
      id: '4',
      title: 'Safety Protocols',
      description: 'Emergency procedures and safety guidelines',
      type: 'PDF',
      category: 'SOPs',
      size: '1.2 MB',
      lastUpdated: '2024-01-03'
    },
    {
      id: '5',
      title: 'Product Price List',
      description: 'Updated pricing for all products',
      type: 'Doc',
      category: 'Circulars',
      size: '0.5 MB',
      lastUpdated: '2024-01-15'
    },
    {
      id: '6',
      title: 'Inventory Management',
      description: 'Guidelines for stock management',
      type: 'PDF',
      category: 'SOPs',
      size: '1.8 MB',
      lastUpdated: '2023-12-28'
    }
  ];

  const categories = Array.from(new Set(documents.map(doc => doc.category)));

  const getFileIcon = (type: string) => {
    return <FileText className="h-5 w-5 text-red-600" />;
  };

  const handleDownload = (document: Document) => {
    // Simulate download
    console.log(`Downloading ${document.title}`);
  };

  const handleView = (document: Document) => {
    // Simulate view
    console.log(`Viewing ${document.title}`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Documents & SOPs" />
      
      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Categories */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {categories.map((category) => {
            const count = documents.filter(doc => doc.category === category).length;
            return (
              <Card key={category} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <Folder className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <h3 className="font-medium text-sm">{category}</h3>
                  <p className="text-xs text-muted-foreground">{count} documents</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Documents List */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">All Documents</h3>
          {documents.map((document) => (
            <Card key={document.id}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {getFileIcon(document.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm mb-1">{document.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{document.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{document.type}</span>
                      <span>{document.size}</span>
                      <span>Updated: {new Date(document.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(document)}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(document)}
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Documents;
