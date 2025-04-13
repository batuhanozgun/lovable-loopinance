
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StorybookPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleOpenStorybook = () => {
    setIsLoading(true);
    // Open Storybook in a new tab
    window.open('http://localhost:6006', '_blank');
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Storybook Integration</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Storybook Interface</CardTitle>
            <CardDescription>
              Access the Storybook development environment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Storybook is a development environment for UI components. It allows you to browse a component library, 
              view the different states of each component, and interactively develop and test components in isolation.
            </p>
            <p className="text-muted-foreground text-sm">
              Note: Storybook requires a development server to be running.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleOpenStorybook}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Opening..." : "Open Storybook"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Component Examples</CardTitle>
            <CardDescription>
              Quick preview of UI components
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="button" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="button">Button</TabsTrigger>
                <TabsTrigger value="card">Card</TabsTrigger>
              </TabsList>
              <TabsContent value="button" className="p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    <Button variant="default">Default</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="card" className="p-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Example Card</CardTitle>
                    <CardDescription>Card description</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Card content goes here</p>
                  </CardContent>
                  <CardFooter>
                    <Button>Action</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-xs text-muted-foreground">
              See full documentation in Storybook
            </p>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Storybook Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Running Storybook</h3>
                <p className="text-sm text-muted-foreground">
                  To run Storybook locally, use the following command:
                </p>
                <div className="bg-muted p-2 rounded-md mt-2 font-mono text-sm">
                  npm run storybook
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Creating Stories</h3>
                <p className="text-sm text-muted-foreground">
                  Create story files with the pattern <code>*.stories.jsx</code>:
                </p>
                <div className="bg-muted p-2 rounded-md mt-2 font-mono text-sm overflow-x-auto">
{`import { Button } from "./button";

export default {
  title: "UI/Button", 
  component: Button,
};

export const Primary = {
  args: {
    children: "Click me",
  },
};`}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StorybookPage;
