import React, { useState } from "react";
import ViewCard from "@/components/ViewCard";
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
  PenLine, 
  BarChart, 
  FileText, 
  Calendar, 
  ArrowUpDown, 
  Filter,
  Eye,
  MessageSquare,
  ThumbsUp,
  Bookmark,
  Plus
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

// Define types for blog posts
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  status: 'published' | 'draft' | 'scheduled';
  publishDate: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
  views: number;
  comments: number;
  likes: number;
}

// Mock data for blog posts
const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with React Hooks',
    excerpt: 'Learn how to use React Hooks to simplify your functional components',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    status: 'published',
    publishDate: '2025-04-10',
    category: 'React',
    tags: ['react', 'hooks', 'javascript'],
    author: {
      name: 'John Doe',
      avatar: '/avatars/01.png',
    },
    views: 1250,
    comments: 32,
    likes: 78
  },
  {
    id: '2',
    title: 'Advanced TypeScript Patterns',
    excerpt: 'Explore advanced TypeScript patterns for better type safety',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    status: 'published',
    publishDate: '2025-04-15',
    category: 'TypeScript',
    tags: ['typescript', 'patterns', 'javascript'],
    author: {
      name: 'Jane Smith',
      avatar: '/avatars/02.png',
    },
    views: 980,
    comments: 24,
    likes: 65
  },
  {
    id: '3',
    title: 'Building Responsive UIs with Tailwind CSS',
    excerpt: 'Learn how to create beautiful responsive interfaces with Tailwind',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    status: 'draft',
    publishDate: '2025-04-20',
    category: 'CSS',
    tags: ['tailwind', 'css', 'responsive'],
    author: {
      name: 'Robert Johnson',
      avatar: '/avatars/03.png',
    },
    views: 0,
    comments: 0,
    likes: 0
  },
  {
    id: '4',
    title: 'State Management with Redux Toolkit',
    excerpt: 'Simplify your Redux code with Redux Toolkit',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    status: 'scheduled',
    publishDate: '2025-04-25',
    category: 'Redux',
    tags: ['redux', 'state-management', 'javascript'],
    author: {
      name: 'Emily Davis',
      avatar: '/avatars/04.png',
    },
    views: 0,
    comments: 0,
    likes: 0
  },
  {
    id: '5',
    title: 'Building APIs with Node.js and Express',
    excerpt: 'Create robust APIs using Node.js and Express',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    status: 'published',
    publishDate: '2025-04-05',
    category: 'Node.js',
    tags: ['node', 'express', 'api'],
    author: {
      name: 'Michael Wilson',
      avatar: '/avatars/05.png',
    },
    views: 1560,
    comments: 45,
    likes: 92
  }
];

const Blogger = (): React.JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Filter blog posts based on search term, filters, and active tab
  const filteredPosts = mockBlogPosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      post.status === statusFilter;
    
    const matchesCategory = 
      categoryFilter === 'all' || 
      post.category === categoryFilter;
    
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'published' && post.status === 'published') ||
      (activeTab === 'drafts' && post.status === 'draft') ||
      (activeTab === 'scheduled' && post.status === 'scheduled');
    
    return matchesSearch && matchesStatus && matchesCategory && matchesTab;
  });

  // Calculate statistics
  const totalPosts = mockBlogPosts.length;
  const publishedPosts = mockBlogPosts.filter(p => p.status === 'published').length;
  const draftPosts = mockBlogPosts.filter(p => p.status === 'draft').length;
  const scheduledPosts = mockBlogPosts.filter(p => p.status === 'scheduled').length;
  const totalViews = mockBlogPosts.reduce((sum, post) => sum + post.views, 0);

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Handle new post button click
  const handleNewPost = () => {
    console.log('Create new post');
  };

  // Get status badge variant
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'published':
        return 'default';
      case 'draft':
        return 'secondary';
      case 'scheduled':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <ViewCard className='pt-[200px]'>
      <div className="container mx-auto py-6 space-y-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
            <p className="text-muted-foreground mt-1">
              Create, edit and manage your blog posts
            </p>
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button className="whitespace-nowrap" onClick={handleNewPost}>
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPosts}</div>
              <p className="text-xs text-muted-foreground">
                From all time
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <Badge className="h-4 text-xs">LIVE</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{publishedPosts}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((publishedPosts / totalPosts) * 100)}% of total
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Across all posts
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Engagement</CardTitle>
              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockBlogPosts.reduce((sum, post) => sum + post.comments + post.likes, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Comments & likes
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Blog Posts Management */}
        <Card>
          <CardHeader>
            <CardTitle>Blog Posts</CardTitle>
            <CardDescription>
              Manage your blog content and track performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <TabsList>
                  <TabsTrigger value="all">All Posts</TabsTrigger>
                  <TabsTrigger value="published">Published</TabsTrigger>
                  <TabsTrigger value="drafts">Drafts</TabsTrigger>
                  <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                </TabsList>
                
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                  <div className="relative flex-1 md:w-[300px]">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search posts..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Select
                      value={categoryFilter}
                      onValueChange={setCategoryFilter}
                    >
                      <SelectTrigger className="w-[180px]">
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          <SelectValue placeholder="Category" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="React">React</SelectItem>
                        <SelectItem value="TypeScript">TypeScript</SelectItem>
                        <SelectItem value="CSS">CSS</SelectItem>
                        <SelectItem value="Redux">Redux</SelectItem>
                        <SelectItem value="Node.js">Node.js</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <TabsContent value="all" className="m-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[350px]">Post</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Stats</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                          <TableRow key={post.id}>
                            <TableCell className="font-medium">
                              <div className="flex flex-col">
                                <span className="font-medium">{post.title}</span>
                                <span className="text-xs text-muted-foreground line-clamp-1">
                                  {post.excerpt}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={getStatusBadge(post.status)} className="capitalize">
                                {post.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{post.category}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span>{formatDate(post.publishDate)}</span>
                                {post.status === 'scheduled' && (
                                  <span className="text-xs text-muted-foreground">Scheduled</span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Badge variant="outline" className="flex gap-1 items-center">
                                  <Eye className="h-3 w-3" /> {post.views}
                                </Badge>
                                <Badge variant="outline" className="flex gap-1 items-center">
                                  <MessageSquare className="h-3 w-3" /> {post.comments}
                                </Badge>
                                <Badge variant="outline" className="flex gap-1 items-center">
                                  <ThumbsUp className="h-3 w-3" /> {post.likes}
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" /> View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <PenLine className="h-4 w-4 mr-2" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <BarChart className="h-4 w-4 mr-2" /> Analytics
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            No posts found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="published" className="m-0">
                <div className="rounded-md border">
                  {/* Same table structure as "all" tab but filtered for published posts */}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[350px]">Post</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Stats</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                          <TableRow key={post.id}>
                            <TableCell className="font-medium">
                              <div className="flex flex-col">
                                <span className="font-medium">{post.title}</span>
                                <span className="text-xs text-muted-foreground line-clamp-1">
                                  {post.excerpt}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={getStatusBadge(post.status)} className="capitalize">
                                {post.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{post.category}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span>{formatDate(post.publishDate)}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Badge variant="outline" className="flex gap-1 items-center">
                                  <Eye className="h-3 w-3" /> {post.views}
                                </Badge>
                                <Badge variant="outline" className="flex gap-1 items-center">
                                  <MessageSquare className="h-3 w-3" /> {post.comments}
                                </Badge>
                                <Badge variant="outline" className="flex gap-1 items-center">
                                  <ThumbsUp className="h-3 w-3" /> {post.likes}
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" /> View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <PenLine className="h-4 w-4 mr-2" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <BarChart className="h-4 w-4 mr-2" /> Analytics
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            No published posts found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="drafts" className="m-0">
                {/* Similar table structure for drafts */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[350px]">Post</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                          <TableRow key={post.id}>
                            <TableCell className="font-medium">
                              <div className="flex flex-col">
                                <span className="font-medium">{post.title}</span>
                                <span className="text-xs text-muted-foreground line-clamp-1">
                                  {post.excerpt}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={getStatusBadge(post.status)} className="capitalize">
                                {post.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{post.category}</TableCell>
                            <TableCell>{formatDate(post.publishDate)}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" /> Preview
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <PenLine className="h-4 w-4 mr-2" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Bookmark className="h-4 w-4 mr-2" /> Publish
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center">
                            No draft posts found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="scheduled" className="m-0">
                {/* Similar table structure for scheduled posts */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[350px]">Post</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Scheduled For</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                          <TableRow key={post.id}>
                            <TableCell className="font-medium">
                              <div className="flex flex-col">
                                <span className="font-medium">{post.title}</span>
                                <span className="text-xs text-muted-foreground line-clamp-1">
                                  {post.excerpt}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={getStatusBadge(post.status)} className="capitalize">
                                {post.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{post.category}</TableCell>
                            <TableCell>{formatDate(post.publishDate)}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" /> Preview
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <PenLine className="h-4 w-4 mr-2" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Calendar className="h-4 w-4 mr-2" /> Reschedule
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center">
                            No scheduled posts found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredPosts.length} of {totalPosts} posts
            </div>
          </CardFooter>
        </Card>
      </div>
    </ViewCard>
  );
};

export default Blogger;
