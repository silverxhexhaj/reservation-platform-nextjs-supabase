import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SchedulingSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-gray-900">Scheduling</CardTitle>
        <CardDescription className="text-gray-700">Manage your scheduling settings here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-800">Add scheduling options, availability, and other related settings here.</p>
      </CardContent>
    </Card>
  );
}