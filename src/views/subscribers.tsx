import ViewCard from '@/components/ViewCard';
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MoreHorizontal, 
  Search, 
  UserPlus, 
  Users, 
  Mail, 
  Calendar, 
  ArrowUpDown, 
  ChevronDown,
  CheckCircle2,
  XCircle,
  Filter,
  Download,
  Trash2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

// Define types for subscribers
interface Subscriber {
  id: string;
  name: string;
  email: string;
  status: string;
  joinDate: string;
  lastActive: string;
  subscriptionType: string;
  avatar: string;
  [key: string]: string; // Index signature to allow string indexing
}

// Define valid sort keys
type SortKey = keyof Omit<Subscriber, 'avatar'>;

// Mock data for subscribers
const mockSubscribers: Subscriber[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    status: 'active',
    joinDate: '2024-12-15',
    lastActive: '2025-04-18',
    subscriptionType: 'premium',
    avatar: '/avatars/01.png',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    status: 'active',
    joinDate: '2025-01-05',
    lastActive: '2025-04-19',
    subscriptionType: 'basic',
    avatar: '/avatars/02.png',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    status: 'inactive',
    joinDate: '2024-11-20',
    lastActive: '2025-02-10',
    subscriptionType: 'premium',
    avatar: '/avatars/03.png',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    status: 'active',
    joinDate: '2025-02-18',
    lastActive: '2025-04-17',
    subscriptionType: 'premium',
    avatar: '/avatars/04.png',
  },
  {
    id: '5',
    name: 'Michael Wilson',
    email: 'michael.wilson@example.com',
    status: 'active',
    joinDate: '2025-03-10',
    lastActive: '2025-04-19',
    subscriptionType: 'basic',
    avatar: '/avatars/05.png',
  },
  {
    id: '6',
    name: 'Sarah Brown',
    email: 'sarah.brown@example.com',
    status: 'inactive',
    joinDate: '2024-10-05',
    lastActive: '2025-01-15',
    subscriptionType: 'basic',
    avatar: '/avatars/06.png',
  },
  {
    id: '7',
    name: 'David Miller',
    email: 'david.miller@example.com',
    status: 'active',
    joinDate: '2025-01-30',
    lastActive: '2025-04-18',
    subscriptionType: 'premium',
    avatar: '/avatars/07.png',
  },
];

const Subscribers = (): React.JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [subscriptionFilter, setSubscriptionFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' }>({ key: 'name', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of subscribers per page
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newSubscriber, setNewSubscriber] = useState<Omit<Subscriber, 'id' | 'avatar'>>({ 
    name: '', 
    email: '', 
    status: 'active', 
    joinDate: new Date().toISOString().split('T')[0], 
    lastActive: new Date().toISOString().split('T')[0], 
    subscriptionType: 'basic' 
  });
  const [subscribers, setSubscribers] = useState<Subscriber[]>(mockSubscribers);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Filter subscribers based on search term and filters
  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesSearch = 
      subscriber.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      subscriber.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      subscriber.status === statusFilter;
    
    const matchesSubscription = 
      subscriptionFilter === 'all' || 
      subscriber.subscriptionType === subscriptionFilter;
    
    return matchesSearch && matchesStatus && matchesSubscription;
  });

  // Sort subscribers
  const sortedSubscribers = [...filteredSubscribers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedSubscribers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedSubscribers.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page changes
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle sort
  const requestSort = (key: SortKey) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Calculate statistics
  const totalSubscribers = subscribers.length;
  const activeSubscribers = subscribers.filter(s => s.status === 'active').length;
  const premiumSubscribers = subscribers.filter(s => s.subscriptionType === 'premium').length;
  const newSubscribersThisMonth = subscribers.filter(s => {
    const joinDate = new Date(s.joinDate);
    const now = new Date();
    return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear();
  }).length;

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSubscriber(prev => ({ ...prev, [name]: value }));
  };

  // Handle checkbox changes
  const handleStatusChange = (checked: boolean) => {
    setNewSubscriber(prev => ({ ...prev, status: checked ? 'active' : 'inactive' }));
  };

  // Add new subscriber
  const handleAddSubscriber = () => {
    // Generate a random ID and avatar
    const newId = (subscribers.length + 1).toString();
    const randomAvatar = `/avatars/0${Math.floor(Math.random() * 9) + 1}.png`;
    
    const subscriber: Subscriber = {
      ...newSubscriber,
      id: newId,
      avatar: randomAvatar
    };
    
    setSubscribers(prev => [subscriber, ...prev]);
    setIsAddDialogOpen(false);
    setToastMessage('Subscriber added successfully!');
    setShowToast(true);
    
    // Reset form
    setNewSubscriber({ 
      name: '', 
      email: '', 
      status: 'active', 
      joinDate: new Date().toISOString().split('T')[0], 
      lastActive: new Date().toISOString().split('T')[0], 
      subscriptionType: 'basic' 
    });
  };

  // Show toast notification
  useEffect(() => {
    if (showToast) {
      toast({
        title: "Success",
        description: toastMessage,
      });
      setShowToast(false);
    }
  }, [showToast, toastMessage]);

  return (
    <ViewCard className='pt-[200px]'>
      <div className="container mx-auto py-6 space-y-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Subscribers</h1>
            <p className="text-muted-foreground mt-1">
              Manage and monitor your subscribers
            </p>
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="whitespace-nowrap">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Subscriber
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Subscriber</DialogTitle>
                  <DialogDescription>
                    Fill in the details to add a new subscriber to your platform.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={newSubscriber.name}
                      onChange={handleInputChange}
                      className="col-span-3"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={newSubscriber.email}
                      onChange={handleInputChange}
                      className="col-span-3"
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="subscriptionType" className="text-right">
                      Plan
                    </Label>
                    <Select 
                      name="subscriptionType" 
                      value={newSubscriber.subscriptionType}
                      onValueChange={(value) => setNewSubscriber(prev => ({ ...prev, subscriptionType: value }))}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <div className="flex items-center space-x-2 col-span-3">
                      <Checkbox 
                        id="status" 
                        checked={newSubscriber.status === 'active'}
                        onCheckedChange={handleStatusChange}
                      />
                      <label
                        htmlFor="status"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Active
                      </label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleAddSubscriber} disabled={!newSubscriber.name || !newSubscriber.email}>Add Subscriber</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline" className="whitespace-nowrap">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSubscribers}</div>
              <p className="text-xs text-muted-foreground">
                From all time
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeSubscribers}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((activeSubscribers / totalSubscribers) * 100)}% of total
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Premium Subscribers</CardTitle>
              <Badge className="h-4 text-xs">PRO</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{premiumSubscribers}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((premiumSubscribers / totalSubscribers) * 100)}% of total
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">New This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{newSubscribersThisMonth}</div>
              <p className="text-xs text-muted-foreground">
                In {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Subscriber List</CardTitle>
            <CardDescription>
              Manage your subscribers and their subscription status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <div className="w-[180px]">
                  <Select
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger>
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <SelectValue placeholder="Status" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-[180px]">
                  <Select
                    value={subscriptionFilter}
                    onValueChange={setSubscriptionFilter}
                  >
                    <SelectTrigger>
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <SelectValue placeholder="Subscription" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Plans</SelectItem>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Subscribers Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">
                      <Button 
                        variant="ghost" 
                        onClick={() => requestSort('name')}
                        className="flex items-center gap-1 p-0 h-auto font-medium"
                      >
                        Subscriber
                        <ArrowUpDown className="h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button 
                        variant="ghost" 
                        onClick={() => requestSort('status')}
                        className="flex items-center gap-1 p-0 h-auto font-medium"
                      >
                        Status
                        <ArrowUpDown className="h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button 
                        variant="ghost" 
                        onClick={() => requestSort('subscriptionType')}
                        className="flex items-center gap-1 p-0 h-auto font-medium"
                      >
                        Plan
                        <ArrowUpDown className="h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button 
                        variant="ghost" 
                        onClick={() => requestSort('joinDate')}
                        className="flex items-center gap-1 p-0 h-auto font-medium"
                      >
                        Join Date
                        <ArrowUpDown className="h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button 
                        variant="ghost" 
                        onClick={() => requestSort('lastActive')}
                        className="flex items-center gap-1 p-0 h-auto font-medium"
                      >
                        Last Active
                        <ArrowUpDown className="h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.length > 0 ? (
                    currentItems.map((subscriber) => (
                      <TableRow key={subscriber.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={subscriber.avatar} alt={subscriber.name} />
                              <AvatarFallback>{subscriber.name.charAt(0)}{subscriber.name.split(' ')[1]?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-medium">{subscriber.name}</span>
                              <span className="text-xs text-muted-foreground flex items-center">
                                <Mail className="h-3 w-3 mr-1" />
                                {subscriber.email}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={subscriber.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                            {subscriber.status === 'active' ? (
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                            ) : (
                              <XCircle className="h-3 w-3 mr-1" />
                            )}
                            {subscriber.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={subscriber.subscriptionType === 'premium' ? 'outline' : 'secondary'} className="capitalize">
                            {subscriber.subscriptionType}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(subscriber.joinDate)}</TableCell>
                        <TableCell>{formatDate(subscriber.lastActive)}</TableCell>
                        <TableCell className="text-right">
                          <AlertDialog>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View details</DropdownMenuItem>
                                <DropdownMenuItem>Edit subscriber</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <AlertDialogTrigger asChild>
                                  <DropdownMenuItem className="text-destructive">
                                    Delete subscriber
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the subscriber
                                  and remove their data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No subscribers found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedSubscribers.length)} of {sortedSubscribers.length} subscribers
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePrevPage} 
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm mx-2">
                Page {currentPage} of {totalPages || 1}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleNextPage} 
                disabled={currentPage === totalPages || totalPages === 0}
              >
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </ViewCard>
  );
};

export default Subscribers;