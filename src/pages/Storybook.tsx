
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ChevronRight, 
  Home, 
  Settings, 
  User, 
  Menu, 
  Bell, 
  Check, 
  X,
  Github,
  Calendar,
  CreditCard,
  Heart,
  Mail,
  MessageSquare
} from "lucide-react";

const StorybookPage = () => {
  const [progress, setProgress] = useState(45);
  const [switchValue, setSwitchValue] = useState(false);
  const [activeTab, setActiveTab] = useState("buttons");

  // Define type-safe variants
  type ButtonVariant = "default" | "link" | "destructive" | "outline" | "secondary" | "ghost" | "gradient";
  type ButtonSize = "default" | "sm" | "lg" | "icon";
  type CardVariant = "default" | "glass";
  type BadgeVariant = "default" | "destructive" | "outline" | "secondary" | "success" | "warning" | "info";

  // Button props controls
  const [buttonProps, setButtonProps] = useState({
    variant: "default" as ButtonVariant,
    size: "default" as ButtonSize,
    disabled: false,
    withIcon: false,
    label: "Button",
    iconPosition: "left"
  });

  // Badge props controls
  const [badgeProps, setBadgeProps] = useState({
    variant: "default" as BadgeVariant,
    label: "Badge"
  });

  // Card props controls
  const [cardProps, setCardProps] = useState({
    variant: "default" as CardVariant,
    withHeader: true,
    withFooter: true,
    title: "Card Title",
    description: "Card Description",
    content: "Card Content"
  });

  // Input props controls
  const [inputProps, setInputProps] = useState({
    type: "text",
    placeholder: "Enter text...",
    disabled: false
  });

  // Icon selection for button
  const icons = {
    User: <User size={16} />,
    Settings: <Settings size={16} />,
    Heart: <Heart size={16} />,
    Bell: <Bell size={16} />,
    Calendar: <Calendar size={16} />,
    Mail: <Mail size={16} />,
    MessageSquare: <MessageSquare size={16} />,
    Github: <Github size={16} />
  };
  
  const [selectedIcon, setSelectedIcon] = useState("User");

  // Helper function to update button props
  const updateButtonProps = (prop: string, value: any) => {
    setButtonProps(prev => ({ ...prev, [prop]: value }));
  };

  // Helper function to update badge props
  const updateBadgeProps = (prop: string, value: any) => {
    setBadgeProps(prev => ({ ...prev, [prop]: value }));
  };

  // Helper function to update card props
  const updateCardProps = (prop: string, value: any) => {
    setCardProps(prev => ({ ...prev, [prop]: value }));
  };

  // Helper function to update input props
  const updateInputProps = (prop: string, value: any) => {
    setInputProps(prev => ({ ...prev, [prop]: value }));
  };

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
                  Interactive button with customizable properties
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Preview area */}
                  <div className="space-y-4">
                    <h3 className="text-md font-medium">Preview</h3>
                    <div className="flex items-center justify-center p-10 bg-muted rounded-md">
                      <Button 
                        variant={buttonProps.variant} 
                        size={buttonProps.size} 
                        disabled={buttonProps.disabled}
                      >
                        {buttonProps.withIcon && buttonProps.iconPosition === "left" && icons[selectedIcon]}
                        {buttonProps.label}
                        {buttonProps.withIcon && buttonProps.iconPosition === "right" && icons[selectedIcon]}
                      </Button>
                    </div>
                    
                    <div className="pt-4">
                      <h3 className="text-md font-medium mb-2">Generated Code</h3>
                      <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
{`<Button 
  variant="${buttonProps.variant}"
  size="${buttonProps.size}"${buttonProps.disabled ? `
  disabled={true}` : ''}
>
  ${buttonProps.withIcon && buttonProps.iconPosition === "left" ? `<${selectedIcon} size={16} /> ` : ''}${buttonProps.label}${buttonProps.withIcon && buttonProps.iconPosition === "right" ? ` <${selectedIcon} size={16} />` : ''}
</Button>`}
                      </div>
                    </div>
                  </div>
                  
                  {/* Controls area */}
                  <div className="space-y-4 border-l pl-8">
                    <h3 className="text-md font-medium">Controls</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="button-label">Label</Label>
                        <Input 
                          id="button-label" 
                          value={buttonProps.label} 
                          onChange={(e) => updateButtonProps('label', e.target.value)} 
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="button-variant">Variant</Label>
                        <Select 
                          value={buttonProps.variant} 
                          onValueChange={(value: ButtonVariant) => updateButtonProps('variant', value)}
                        >
                          <SelectTrigger id="button-variant">
                            <SelectValue placeholder="Select variant" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="destructive">Destructive</SelectItem>
                            <SelectItem value="outline">Outline</SelectItem>
                            <SelectItem value="secondary">Secondary</SelectItem>
                            <SelectItem value="ghost">Ghost</SelectItem>
                            <SelectItem value="link">Link</SelectItem>
                            <SelectItem value="gradient">Gradient</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="button-size">Size</Label>
                        <Select 
                          value={buttonProps.size} 
                          onValueChange={(value: ButtonSize) => updateButtonProps('size', value)}
                        >
                          <SelectTrigger id="button-size">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="sm">Small</SelectItem>
                            <SelectItem value="lg">Large</SelectItem>
                            <SelectItem value="icon">Icon</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="button-disabled" 
                          checked={buttonProps.disabled} 
                          onCheckedChange={(checked) => updateButtonProps('disabled', checked)}
                        />
                        <Label htmlFor="button-disabled">Disabled</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="button-with-icon" 
                          checked={buttonProps.withIcon} 
                          onCheckedChange={(checked) => updateButtonProps('withIcon', checked)}
                        />
                        <Label htmlFor="button-with-icon">With Icon</Label>
                      </div>
                      
                      {buttonProps.withIcon && (
                        <>
                          <div>
                            <Label htmlFor="button-icon">Icon</Label>
                            <Select 
                              value={selectedIcon} 
                              onValueChange={setSelectedIcon}
                            >
                              <SelectTrigger id="button-icon">
                                <SelectValue placeholder="Select icon" />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.keys(icons).map(icon => (
                                  <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="button-icon-position">Icon Position</Label>
                            <Select 
                              value={buttonProps.iconPosition} 
                              onValueChange={(value) => updateButtonProps('iconPosition', value)}
                            >
                              <SelectTrigger id="button-icon-position">
                                <SelectValue placeholder="Select position" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="left">Left</SelectItem>
                                <SelectItem value="right">Right</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
                <CardDescription>Available button variants</CardDescription>
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
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* CARDS SECTION */}
          <TabsContent value="cards" className="space-y-8 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Card Component</CardTitle>
                <CardDescription>Customizable card container</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Preview area */}
                  <div className="space-y-4">
                    <h3 className="text-md font-medium">Preview</h3>
                    <div className="p-4 bg-muted rounded-md">
                      <Card variant={cardProps.variant} className="w-full">
                        {cardProps.withHeader && (
                          <CardHeader>
                            <CardTitle>{cardProps.title}</CardTitle>
                            <CardDescription>{cardProps.description}</CardDescription>
                          </CardHeader>
                        )}
                        <CardContent>
                          <p>{cardProps.content}</p>
                        </CardContent>
                        {cardProps.withFooter && (
                          <CardFooter>
                            <Button size="sm">Action</Button>
                          </CardFooter>
                        )}
                      </Card>
                    </div>
                    
                    <div className="pt-4">
                      <h3 className="text-md font-medium mb-2">Generated Code</h3>
                      <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
{`<Card${cardProps.variant !== "default" ? ` variant="${cardProps.variant}"` : ''}>
  ${cardProps.withHeader ? `<CardHeader>
    <CardTitle>${cardProps.title}</CardTitle>
    <CardDescription>${cardProps.description}</CardDescription>
  </CardHeader>` : ''}
  <CardContent>
    <p>${cardProps.content}</p>
  </CardContent>
  ${cardProps.withFooter ? `<CardFooter>
    <Button size="sm">Action</Button>
  </CardFooter>` : ''}
</Card>`}
                      </div>
                    </div>
                  </div>
                  
                  {/* Controls area */}
                  <div className="space-y-4 border-l pl-8">
                    <h3 className="text-md font-medium">Controls</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="card-variant">Variant</Label>
                        <Select 
                          value={cardProps.variant} 
                          onValueChange={(value: CardVariant) => updateCardProps('variant', value)}
                        >
                          <SelectTrigger id="card-variant">
                            <SelectValue placeholder="Select variant" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="glass">Glass</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="card-with-header" 
                          checked={cardProps.withHeader} 
                          onCheckedChange={(checked) => updateCardProps('withHeader', checked)}
                        />
                        <Label htmlFor="card-with-header">With Header</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="card-with-footer" 
                          checked={cardProps.withFooter} 
                          onCheckedChange={(checked) => updateCardProps('withFooter', checked)}
                        />
                        <Label htmlFor="card-with-footer">With Footer</Label>
                      </div>
                      
                      {cardProps.withHeader && (
                        <>
                          <div>
                            <Label htmlFor="card-title">Title</Label>
                            <Input 
                              id="card-title" 
                              value={cardProps.title} 
                              onChange={(e) => updateCardProps('title', e.target.value)} 
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="card-description">Description</Label>
                            <Input 
                              id="card-description" 
                              value={cardProps.description} 
                              onChange={(e) => updateCardProps('description', e.target.value)} 
                            />
                          </div>
                        </>
                      )}
                      
                      <div>
                        <Label htmlFor="card-content">Content</Label>
                        <Textarea 
                          id="card-content" 
                          value={cardProps.content} 
                          onChange={(e) => updateCardProps('content', e.target.value)} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Card Variants</CardTitle>
                <CardDescription>Available card styles</CardDescription>
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
            </Card>
          </TabsContent>
          
          {/* INPUTS SECTION */}
          <TabsContent value="inputs" className="space-y-8 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Input Component</CardTitle>
                <CardDescription>Customizable text input field</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Preview area */}
                  <div className="space-y-4">
                    <h3 className="text-md font-medium">Preview</h3>
                    <div className="p-10 bg-muted rounded-md flex justify-center">
                      <div className="w-full max-w-xs">
                        <Label htmlFor="preview-input" className="mb-2 block">Input</Label>
                        <Input 
                          id="preview-input"
                          type={inputProps.type}
                          placeholder={inputProps.placeholder}
                          disabled={inputProps.disabled}
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <h3 className="text-md font-medium mb-2">Generated Code</h3>
                      <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
{`<Input 
  type="${inputProps.type}"
  placeholder="${inputProps.placeholder}"${inputProps.disabled ? `
  disabled={true}` : ''}
/>`}
                      </div>
                    </div>
                  </div>
                  
                  {/* Controls area */}
                  <div className="space-y-4 border-l pl-8">
                    <h3 className="text-md font-medium">Controls</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="input-type">Input Type</Label>
                        <Select 
                          value={inputProps.type} 
                          onValueChange={(value) => updateInputProps('type', value)}
                        >
                          <SelectTrigger id="input-type">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Text</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="password">Password</SelectItem>
                            <SelectItem value="number">Number</SelectItem>
                            <SelectItem value="tel">Telephone</SelectItem>
                            <SelectItem value="url">URL</SelectItem>
                            <SelectItem value="date">Date</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="input-placeholder">Placeholder</Label>
                        <Input 
                          id="input-placeholder" 
                          value={inputProps.placeholder} 
                          onChange={(e) => updateInputProps('placeholder', e.target.value)} 
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="input-disabled" 
                          checked={inputProps.disabled} 
                          onCheckedChange={(checked) => updateInputProps('disabled', checked)}
                        />
                        <Label htmlFor="input-disabled">Disabled</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
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
            </Card>
          </TabsContent>
          
          {/* DATA DISPLAY SECTION */}
          <TabsContent value="data" className="space-y-8 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Badge Component</CardTitle>
                <CardDescription>Customizable status indicator</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Preview area */}
                  <div className="space-y-4">
                    <h3 className="text-md font-medium">Preview</h3>
                    <div className="p-10 bg-muted rounded-md flex justify-center">
                      <Badge variant={badgeProps.variant}>
                        {badgeProps.label}
                      </Badge>
                    </div>
                    
                    <div className="pt-4">
                      <h3 className="text-md font-medium mb-2">Generated Code</h3>
                      <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
{`<Badge${badgeProps.variant !== "default" ? ` variant="${badgeProps.variant}"` : ''}>
  ${badgeProps.label}
</Badge>`}
                      </div>
                    </div>
                  </div>
                  
                  {/* Controls area */}
                  <div className="space-y-4 border-l pl-8">
                    <h3 className="text-md font-medium">Controls</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="badge-variant">Variant</Label>
                        <Select 
                          value={badgeProps.variant} 
                          onValueChange={(value: BadgeVariant) => updateBadgeProps('variant', value)}
                        >
                          <SelectTrigger id="badge-variant">
                            <SelectValue placeholder="Select variant" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="secondary">Secondary</SelectItem>
                            <SelectItem value="outline">Outline</SelectItem>
                            <SelectItem value="destructive">Destructive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="badge-label">Label</Label>
                        <Input 
                          id="badge-label" 
                          value={badgeProps.label} 
                          onChange={(e) => updateBadgeProps('label', e.target.value)} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
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
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interactive UI Library</CardTitle>
              <CardDescription>
                This UI component library allows you to:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc pl-5">
                <li>View and interact with UI components</li>
                <li>Customize component properties in real-time</li>
                <li>See the generated code for your customized components</li>
                <li>Explore different variants and configurations</li>
                <li>Copy and paste the generated code into your project</li>
              </ul>
              
              <div className="mt-6 p-4 bg-muted rounded-md border border-muted-foreground/20">
                <h3 className="text-lg font-medium">How to use this library</h3>
                <ol className="space-y-2 list-decimal pl-5 mt-2">
                  <li>Select a component category from the tabs above</li>
                  <li>Use the controls to customize the component's properties</li>
                  <li>See the changes reflected in real-time in the preview area</li>
                  <li>Copy the generated code for use in your application</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StorybookPage;
