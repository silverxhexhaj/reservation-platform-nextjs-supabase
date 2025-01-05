'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Switch } from "@/app/components/ui/switch";

interface Role {
  id: string;
  name: string;
  permissions: {
    canManageTeam: boolean;
    canManageClients: boolean;
    canManageServices: boolean;
    canManageSchedule: boolean;
  };
}

const defaultRoles: Role[] = [
  {
    id: '1',
    name: 'Manager',
    permissions: {
      canManageTeam: true,
      canManageClients: true,
      canManageServices: true,
      canManageSchedule: true,
    },
  },
  {
    id: '2',
    name: 'Staff',
    permissions: {
      canManageTeam: false,
      canManageClients: true,
      canManageServices: false,
      canManageSchedule: true,
    },
  },
  {
    id: '3',
    name: 'Receptionist',
    permissions: {
      canManageTeam: false,
      canManageClients: true,
      canManageServices: false,
      canManageSchedule: true,
    },
  },
];

interface ManageRolesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ManageRolesDialog({ open, onOpenChange }: ManageRolesDialogProps) {
  const [roles, setRoles] = useState<Role[]>(defaultRoles);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newRole, setNewRole] = useState<Role>({
    id: '',
    name: '',
    permissions: {
      canManageTeam: false,
      canManageClients: false,
      canManageServices: false,
      canManageSchedule: false,
    },
  });

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setIsCreating(false);
  };

  const handleUpdateRole = (updatedRole: Role) => {
    setRoles(prev => prev.map(role => 
      role.id === updatedRole.id ? updatedRole : role
    ));
    setEditingRole(null);
  };

  const handleCreateRole = () => {
    const roleWithId = {
      ...newRole,
      id: Math.random().toString(36).substr(2, 9),
    };
    setRoles(prev => [...prev, roleWithId]);
    setNewRole({
      id: '',
      name: '',
      permissions: {
        canManageTeam: false,
        canManageClients: false,
        canManageServices: false,
        canManageSchedule: false,
      },
    });
    setIsCreating(false);
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles(prev => prev.filter(role => role.id !== roleId));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-white">
        <DialogHeader>
          <DialogTitle>Manage Roles</DialogTitle>
          <DialogDescription>
            Create and manage roles to control team member permissions.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Role List */}
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-[200px]">Role Name</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">{role.name}</TableCell>
                    <TableCell>
                      <div className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch 
                            checked={role.permissions.canManageTeam}
                            disabled
                          />
                          <Label className="text-sm">Team</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch 
                            checked={role.permissions.canManageClients}
                            disabled
                          />
                          <Label className="text-sm">Clients</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch 
                            checked={role.permissions.canManageServices}
                            disabled
                          />
                          <Label className="text-sm">Services</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch 
                            checked={role.permissions.canManageSchedule}
                            disabled
                          />
                          <Label className="text-sm">Schedule</Label>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditRole(role)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteRole(role.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Add New Role Button */}
          {!editingRole && !isCreating && (
            <Button
              onClick={() => setIsCreating(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Role
            </Button>
          )}

          {/* Edit Role Form */}
          {editingRole && (
            <div className="space-y-4 border rounded-lg p-4">
              <h3 className="text-lg font-medium">Edit Role</h3>
              <div className="space-y-4">
                <div>
                  <Label>Role Name</Label>
                  <Input
                    value={editingRole.name}
                    onChange={(e) => setEditingRole({
                      ...editingRole,
                      name: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={editingRole.permissions.canManageTeam}
                        onCheckedChange={(checked) => setEditingRole({
                          ...editingRole,
                          permissions: {
                            ...editingRole.permissions,
                            canManageTeam: checked
                          }
                        })}
                      />
                      <Label>Manage Team</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={editingRole.permissions.canManageClients}
                        onCheckedChange={(checked) => setEditingRole({
                          ...editingRole,
                          permissions: {
                            ...editingRole.permissions,
                            canManageClients: checked
                          }
                        })}
                      />
                      <Label>Manage Clients</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={editingRole.permissions.canManageServices}
                        onCheckedChange={(checked) => setEditingRole({
                          ...editingRole,
                          permissions: {
                            ...editingRole.permissions,
                            canManageServices: checked
                          }
                        })}
                      />
                      <Label>Manage Services</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={editingRole.permissions.canManageSchedule}
                        onCheckedChange={(checked) => setEditingRole({
                          ...editingRole,
                          permissions: {
                            ...editingRole.permissions,
                            canManageSchedule: checked
                          }
                        })}
                      />
                      <Label>Manage Schedule</Label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setEditingRole(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleUpdateRole(editingRole)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Create Role Form */}
          {isCreating && (
            <div className="space-y-4 border rounded-lg p-4">
              <h3 className="text-lg font-medium">Create New Role</h3>
              <div className="space-y-4">
                <div>
                  <Label>Role Name</Label>
                  <Input
                    value={newRole.name}
                    onChange={(e) => setNewRole({
                      ...newRole,
                      name: e.target.value
                    })}
                    placeholder="Enter role name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={newRole.permissions.canManageTeam}
                        onCheckedChange={(checked) => setNewRole({
                          ...newRole,
                          permissions: {
                            ...newRole.permissions,
                            canManageTeam: checked
                          }
                        })}
                      />
                      <Label>Manage Team</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={newRole.permissions.canManageClients}
                        onCheckedChange={(checked) => setNewRole({
                          ...newRole,
                          permissions: {
                            ...newRole.permissions,
                            canManageClients: checked
                          }
                        })}
                      />
                      <Label>Manage Clients</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={newRole.permissions.canManageServices}
                        onCheckedChange={(checked) => setNewRole({
                          ...newRole,
                          permissions: {
                            ...newRole.permissions,
                            canManageServices: checked
                          }
                        })}
                      />
                      <Label>Manage Services</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={newRole.permissions.canManageSchedule}
                        onCheckedChange={(checked) => setNewRole({
                          ...newRole,
                          permissions: {
                            ...newRole.permissions,
                            canManageSchedule: checked
                          }
                        })}
                      />
                      <Label>Manage Schedule</Label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreating(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateRole}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={!newRole.name}
                  >
                    Create Role
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 