
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, CheckCircle, AlertTriangle, Wrench, Plus, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MaintenanceItem {
  id: string;
  category: string;
  item: string;
  completed: boolean;
  dueDate?: string;
  mileage?: string;
  notes?: string;
  priority: 'low' | 'medium' | 'high';
}

interface MaintenanceChecklistProps {
  vehicleId: number;
}

const defaultMaintenanceItems: Omit<MaintenanceItem, 'id' | 'completed' | 'dueDate' | 'mileage' | 'notes'>[] = [
  // Engine & Performance
  { category: 'Engine & Performance', item: 'Oil Change', priority: 'high' },
  { category: 'Engine & Performance', item: 'Oil Filter Replacement', priority: 'high' },
  { category: 'Engine & Performance', item: 'Air Filter Replacement', priority: 'medium' },
  { category: 'Engine & Performance', item: 'Fuel Filter Replacement', priority: 'medium' },
  { category: 'Engine & Performance', item: 'Spark Plugs Replacement', priority: 'medium' },
  { category: 'Engine & Performance', item: 'Spark Plug Wires Inspection', priority: 'low' },
  { category: 'Engine & Performance', item: 'PCV Valve Check', priority: 'low' },
  { category: 'Engine & Performance', item: 'Engine Belt Inspection', priority: 'medium' },
  { category: 'Engine & Performance', item: 'Engine Coolant Level Check', priority: 'high' },
  { category: 'Engine & Performance', item: 'Radiator Inspection', priority: 'medium' },
  
  // Transmission & Drivetrain
  { category: 'Transmission & Drivetrain', item: 'Transmission Fluid Change', priority: 'high' },
  { category: 'Transmission & Drivetrain', item: 'Differential Oil Change', priority: 'medium' },
  { category: 'Transmission & Drivetrain', item: 'Transfer Case Service (4WD)', priority: 'medium' },
  { category: 'Transmission & Drivetrain', item: 'CV Joint Inspection', priority: 'medium' },
  { category: 'Transmission & Drivetrain', item: 'U-Joint Lubrication', priority: 'low' },
  
  // Brakes & Safety
  { category: 'Brakes & Safety', item: 'Brake Pad Inspection', priority: 'high' },
  { category: 'Brakes & Safety', item: 'Brake Rotor Inspection', priority: 'high' },
  { category: 'Brakes & Safety', item: 'Brake Fluid Level Check', priority: 'high' },
  { category: 'Brakes & Safety', item: 'Brake Line Inspection', priority: 'medium' },
  { category: 'Brakes & Safety', item: 'Emergency Brake Adjustment', priority: 'medium' },
  
  // Tires & Wheels
  { category: 'Tires & Wheels', item: 'Tire Pressure Check', priority: 'high' },
  { category: 'Tires & Wheels', item: 'Tire Tread Inspection', priority: 'high' },
  { category: 'Tires & Wheels', item: 'Tire Rotation', priority: 'medium' },
  { category: 'Tires & Wheels', item: 'Wheel Alignment Check', priority: 'medium' },
  { category: 'Tires & Wheels', item: 'Wheel Balancing', priority: 'low' },
  { category: 'Tires & Wheels', item: 'Spare Tire Condition', priority: 'low' },
  
  // Electrical & Lighting
  { category: 'Electrical & Lighting', item: 'Battery Test', priority: 'high' },
  { category: 'Electrical & Lighting', item: 'Battery Terminal Cleaning', priority: 'medium' },
  { category: 'Electrical & Lighting', item: 'Alternator Test', priority: 'medium' },
  { category: 'Electrical & Lighting', item: 'Starter Inspection', priority: 'medium' },
  { category: 'Electrical & Lighting', item: 'Headlight Function', priority: 'high' },
  { category: 'Electrical & Lighting', item: 'Taillight Function', priority: 'high' },
  { category: 'Electrical & Lighting', item: 'Turn Signal Function', priority: 'high' },
  { category: 'Electrical & Lighting', item: 'Interior Lights Check', priority: 'low' },
  
  // Suspension & Steering
  { category: 'Suspension & Steering', item: 'Shock Absorber Inspection', priority: 'medium' },
  { category: 'Suspension & Steering', item: 'Strut Inspection', priority: 'medium' },
  { category: 'Suspension & Steering', item: 'Power Steering Fluid', priority: 'medium' },
  { category: 'Suspension & Steering', item: 'Steering Linkage Check', priority: 'medium' },
  { category: 'Suspension & Steering', item: 'Ball Joint Inspection', priority: 'medium' },
  
  // Exhaust & Emissions
  { category: 'Exhaust & Emissions', item: 'Exhaust System Inspection', priority: 'medium' },
  { category: 'Exhaust & Emissions', item: 'Catalytic Converter Check', priority: 'low' },
  { category: 'Exhaust & Emissions', item: 'Oxygen Sensor Test', priority: 'low' },
  { category: 'Exhaust & Emissions', item: 'Emissions Test', priority: 'high' },
  
  // Body & Interior
  { category: 'Body & Interior', item: 'Windshield Wiper Blades', priority: 'medium' },
  { category: 'Body & Interior', item: 'Windshield Washer Fluid', priority: 'low' },
  { category: 'Body & Interior', item: 'HVAC System Check', priority: 'low' },
  { category: 'Body & Interior', item: 'Seat Belt Inspection', priority: 'high' },
  { category: 'Body & Interior', item: 'Mirror Adjustment', priority: 'low' },
  
  // Fluids & Lubrication
  { category: 'Fluids & Lubrication', item: 'Engine Oil Level', priority: 'high' },
  { category: 'Fluids & Lubrication', item: 'Coolant Level', priority: 'high' },
  { category: 'Fluids & Lubrication', item: 'Brake Fluid Level', priority: 'high' },
  { category: 'Fluids & Lubrication', item: 'Power Steering Fluid Level', priority: 'medium' },
  { category: 'Fluids & Lubrication', item: 'Windshield Washer Fluid', priority: 'low' },
  { category: 'Fluids & Lubrication', item: 'Grease Fittings Lubrication', priority: 'low' }
];

export function MaintenanceChecklist({ vehicleId }: MaintenanceChecklistProps) {
  const { toast } = useToast();
  const [maintenanceItems, setMaintenanceItems] = useState<MaintenanceItem[]>(
    defaultMaintenanceItems.map((item, index) => ({
      ...item,
      id: `${vehicleId}-${index}`,
      completed: false
    }))
  );
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [customItem, setCustomItem] = useState({
    category: '',
    item: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });
  const [generalNotes, setGeneralNotes] = useState('');

  const updateMaintenanceItem = (id: string, updates: Partial<MaintenanceItem>) => {
    setMaintenanceItems(items =>
      items.map(item =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const addCustomMaintenanceItem = () => {
    if (!customItem.category || !customItem.item) {
      toast({
        title: "Missing Information",
        description: "Please fill in both category and item fields.",
        variant: "destructive"
      });
      return;
    }

    const newItem: MaintenanceItem = {
      id: `${vehicleId}-custom-${Date.now()}`,
      category: customItem.category,
      item: customItem.item,
      priority: customItem.priority,
      completed: false
    };

    setMaintenanceItems(items => [...items, newItem]);
    setCustomItem({ category: '', item: '', priority: 'medium' });
    setShowAddCustom(false);
    
    toast({
      title: "Item Added",
      description: "Custom maintenance item has been added to the checklist."
    });
  };

  const getCompletionStats = () => {
    const total = maintenanceItems.length;
    const completed = maintenanceItems.filter(item => item.completed).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, percentage };
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const categories = [...new Set(maintenanceItems.map(item => item.category))];
  const stats = getCompletionStats();

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Maintenance Checklist
              </CardTitle>
              <CardDescription>
                Comprehensive maintenance tracking for optimal vehicle performance
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {stats.percentage}%
              </div>
              <div className="text-sm text-muted-foreground">
                {stats.completed} of {stats.total} completed
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-4">
            <div 
              className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${stats.percentage}%` }}
            />
          </div>
        </CardHeader>
      </Card>

      {categories.map(category => {
        const categoryItems = maintenanceItems.filter(item => item.category === category);
        const categoryCompleted = categoryItems.filter(item => item.completed).length;
        
        return (
          <Card key={category} className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{category}</CardTitle>
                <Badge variant="outline" className="animate-pulse">
                  {categoryCompleted}/{categoryItems.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {categoryItems.map(item => (
                <div key={item.id} className="space-y-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={item.completed}
                        onCheckedChange={(checked) => 
                          updateMaintenanceItem(item.id, { completed: checked as boolean })
                        }
                        className="data-[state=checked]:animate-scale-in"
                      />
                      <span className={`font-medium ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {item.item}
                      </span>
                    </div>
                    <Badge className={getPriorityColor(item.priority)}>
                      {item.priority}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 ml-6">
                    <div>
                      <Label htmlFor={`date-${item.id}`} className="text-xs">Due Date</Label>
                      <Input
                        id={`date-${item.id}`}
                        type="date"
                        value={item.dueDate || ''}
                        onChange={(e) => updateMaintenanceItem(item.id, { dueDate: e.target.value })}
                        className="h-8"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`mileage-${item.id}`} className="text-xs">Mileage</Label>
                      <Input
                        id={`mileage-${item.id}`}
                        placeholder="90,000"
                        value={item.mileage || ''}
                        onChange={(e) => updateMaintenanceItem(item.id, { mileage: e.target.value })}
                        className="h-8"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <Label htmlFor={`notes-${item.id}`} className="text-xs">Notes</Label>
                      <Input
                        id={`notes-${item.id}`}
                        placeholder="Additional notes..."
                        value={item.notes || ''}
                        onChange={(e) => updateMaintenanceItem(item.id, { notes: e.target.value })}
                        className="h-8"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        );
      })}

      <Card className="border-dashed border-2 hover:border-blue-400 transition-colors duration-300">
        <CardContent className="pt-6">
          {!showAddCustom ? (
            <Button 
              onClick={() => setShowAddCustom(true)}
              variant="ghost" 
              className="w-full h-20 text-muted-foreground hover:text-foreground transition-all duration-200"
            >
              <Plus className="w-6 h-6 mr-2" />
              Add Custom Maintenance Item
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="custom-category">Category</Label>
                  <Input
                    id="custom-category"
                    placeholder="e.g., Custom Category"
                    value={customItem.category}
                    onChange={(e) => setCustomItem({...customItem, category: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="custom-item">Maintenance Item</Label>
                  <Input
                    id="custom-item"
                    placeholder="e.g., Custom maintenance task"
                    value={customItem.item}
                    onChange={(e) => setCustomItem({...customItem, item: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="custom-priority">Priority</Label>
                <select
                  id="custom-priority"
                  value={customItem.priority}
                  onChange={(e) => setCustomItem({...customItem, priority: e.target.value as 'low' | 'medium' | 'high'})}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button onClick={addCustomMaintenanceItem} size="sm">
                  Add Item
                </Button>
                <Button onClick={() => setShowAddCustom(false)} variant="outline" size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            General Maintenance Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Add general maintenance notes, observations, or reminders for this vehicle..."
            value={generalNotes}
            onChange={(e) => setGeneralNotes(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </CardContent>
      </Card>
    </div>
  );
}
