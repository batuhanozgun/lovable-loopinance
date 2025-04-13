
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Home, Settings, User, Menu, Bell, Check, X } from "lucide-react";

const StorybookPage = () => {
  const [progress, setProgress] = useState(45);
  const [switchValue, setSwitchValue] = useState(false);
  const [activeTab, setActiveTab] = useState("buttons");

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col gap-4 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">UI Component Library</h1>
          <p className="text-muted-foreground mt-2">
            Interactive showcase of available UI components with examples and documentation
          </p>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
            <TabsTrigger value="buttons">Buttons</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="inputs">Inputs</TabsTrigger>
            <TabsTrigger value="data">Data Display</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
          </TabsList>
          
          {/* BUTTONS SECTION */}
          <TabsContent value="buttons" className="space-y-8 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Button Component</CardTitle>
                <CardDescription>
                  Interactive button with various styles and states
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-md font-medium mb-2">Variants</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="default">Default</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                    <Button variant="gradient">Gradient</Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium mb-2">Sizes</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon"><Bell size={16} /></Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium mb-2">States</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button>Enabled</Button>
                    <Button disabled>Disabled</Button>
                    <Button variant="outline" className="gap-2">
                      <User size={16} />
                      With Icon
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex flex-col items-start">
                <h3 className="text-sm font-medium mb-2">Props</h3>
                <div className="text-xs text-muted-foreground mb-2">
                  <p><code>variant</code>: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "gradient"</p>
                  <p><code>size</code>: "default" | "sm" | "lg" | "icon"</p>
                  <p><code>asChild</code>: boolean - When true, component renders as children instead of button</p>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* CARDS SECTION */}
          <TabsContent value="cards" className="space-y-8 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Card Component</CardTitle>
                <CardDescription>Container for content with multiple variants</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Default Card</CardTitle>
                      <CardDescription>Standard card style</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Main content area for the card</p>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm">Action</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card variant="glass">
                    <CardHeader>
                      <CardTitle>Glass Card</CardTitle>
                      <CardDescription>Translucent card style</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Glass effect card with backdrop blur</p>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" variant="outline">Action</Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex flex-col items-start">
                <h3 className="text-sm font-medium mb-2">Structure & Props</h3>
                <div className="text-xs text-muted-foreground mb-2">
                  <p>Card components: <code>Card</code>, <code>CardHeader</code>, <code>CardTitle</code>, <code>CardDescription</code>, <code>CardContent</code>, <code>CardFooter</code></p>
                  <p><code>variant</code>: "default" | "glass"</p>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* INPUTS SECTION */}
          <TabsContent value="inputs" className="space-y-8 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Input Components</CardTitle>
                <CardDescription>Form controls for user input</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="Enter your email" type="email" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" placeholder="Enter password" type="password" />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms">Accept terms</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="notifications" checked={switchValue} onCheckedChange={setSwitchValue} />
                      <Label htmlFor="notifications">Enable notifications</Label>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Type your message here..." />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="mb-2 block">File Upload</Label>
                      <Input id="file" type="file" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex flex-col items-start">
                <h3 className="text-sm font-medium mb-2">Available Input Components</h3>
                <div className="text-xs text-muted-foreground">
                  <p><code>Input</code> - Text input field</p>
                  <p><code>Textarea</code> - Multi-line text input</p>
                  <p><code>Checkbox</code> - Binary selection</p>
                  <p><code>Switch</code> - Toggle control</p>
                  <p><code>Label</code> - Label for form elements</p>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* DATA DISPLAY SECTION */}
          <TabsContent value="data" className="space-y-8 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Display Components</CardTitle>
                <CardDescription>Components for displaying information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-md font-medium mb-2">Badge</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="outline">Outline</Badge>
                      <Badge variant="destructive">Destructive</Badge>
                    </div>
                    
                    <h3 className="text-md font-medium mb-2">Avatar</h3>
                    <div className="flex flex-wrap gap-2">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarFallback><User size={16} /></AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-md font-medium mb-2">Progress</h3>
                    <Progress value={progress} className="w-full" />
                    <div className="flex justify-between">
                      <Button size="sm" variant="outline" onClick={() => setProgress(Math.max(0, progress - 10))}>Decrease</Button>
                      <Button size="sm" variant="outline" onClick={() => setProgress(Math.min(100, progress + 10))}>Increase</Button>
                    </div>
                    
                    <h3 className="text-md font-medium mb-2">Separator</h3>
                    <div className="space-y-2">
                      <p>Above separator</p>
                      <Separator />
                      <p>Below separator</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex flex-col items-start">
                <h3 className="text-sm font-medium mb-2">Available Components</h3>
                <div className="text-xs text-muted-foreground">
                  <p><code>Avatar</code> - User or entity representation</p>
                  <p><code>Badge</code> - Short status descriptor</p>
                  <p><code>Progress</code> - Visual indicator of progress</p>
                  <p><code>Separator</code> - Visual divider between content</p>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* FEEDBACK SECTION */}
          <TabsContent value="feedback" className="space-y-8 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Feedback Components</CardTitle>
                <CardDescription>Components providing user feedback</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-md font-medium mb-2">Skeleton</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[250px]" />
                          <Skeleton className="h-4 w-[200px]" />
                        </div>
                      </div>
                      <Skeleton className="h-32 w-full" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-md font-medium mb-2">Status Indicators</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 rounded-full bg-green-500"></div>
                        <span>Success</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
                        <span>Warning</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 rounded-full bg-red-500"></div>
                        <span>Error</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 rounded-full bg-blue-500 animate-pulse"></div>
                        <span>Loading</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex flex-col items-start">
                <h3 className="text-sm font-medium mb-2">Usage Examples</h3>
                <div className="text-xs text-muted-foreground">
                  <p>Skeletons can be used for content loading states</p>
                  <p>Use status indicators to show process state</p>
                  <p>Combine with other components like Badge for rich feedback</p>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* LAYOUT SECTION */}
          <TabsContent value="layout" className="space-y-8 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Layout Components</CardTitle>
                <CardDescription>Components for organizing page content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium mb-2">Basic Grid</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="bg-muted rounded-md p-4 flex items-center justify-center h-20">
                          Item {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium mb-2">Responsive Layout</h3>
                    <div className="bg-muted p-4 rounded-md">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/3 bg-card p-4 rounded-md border">Sidebar</div>
                        <div className="md:w-2/3 bg-card p-4 rounded-md border">Main Content</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex flex-col items-start">
                <h3 className="text-sm font-medium mb-2">Layout Techniques</h3>
                <div className="text-xs text-muted-foreground">
                  <p>Use container classes for consistent width</p>
                  <p>Responsive designs with Tailwind breakpoints</p>
                  <p>Grid and flexbox layouts for content organization</p>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Usage Documentation</CardTitle>
              <CardDescription>
                How to use components in your application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Component Import</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Import components directly from their location:
                  </p>
                  <div className="bg-muted p-2 rounded-md mt-2 font-mono text-sm">
                    import {'{'} Button {'}'} from "@/components/ui/button";
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">Basic Component Usage</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Example usage of a button component:
                  </p>
                  <div className="bg-muted p-2 rounded-md mt-2 font-mono text-sm overflow-x-auto">
{`<Button 
  variant="default"
  size="default"
  onClick={() => console.log('Button clicked')}
>
  Click Me
</Button>`}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">Component Customization</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Components can be customized using className prop:
                  </p>
                  <div className="bg-muted p-2 rounded-md mt-2 font-mono text-sm overflow-x-auto">
{`<Button 
  className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400"
>
  Custom Gradient
</Button>`}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">Component Composition</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Components can be combined together:
                  </p>
                  <div className="bg-muted p-2 rounded-md mt-2 font-mono text-sm overflow-x-auto">
{`<Card>
  <CardHeader>
    <CardTitle>Example Card</CardTitle>
    <CardDescription>Card with a button</CardDescription>
  </CardHeader>
  <CardContent>
    <p>This card contains a button component</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StorybookPage;
