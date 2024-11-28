import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function AddConference({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    fullName: "",
    website: "",
    location: "",
    deadline: {
      abstract: null,
      fullPaper: null,
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      id: Date.now(),
      deadline: {
        abstract: formData.deadline.abstract?.toISOString() || null,
        fullPaper: formData.deadline.fullPaper?.toISOString() || null,
      },
    };

    onAdd(formattedData);
    setOpen(false);
    setFormData({
      name: "",
      fullName: "",
      website: "",
      location: "",
      deadline: {
        abstract: null,
        fullPaper: null,
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Conference</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Conference</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} id="add-conference-form">
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Short Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="col-span-3"
                required
                placeholder="e.g., VIS 2024"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName" className="text-right">
                Full Name
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="col-span-3"
                required
                placeholder="e.g., IEEE Visualization Conference"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="website" className="text-right">
                Website
              </Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                className="col-span-3"
                required
                placeholder="https://"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="col-span-3"
                required
                placeholder="e.g., Vienna, Austria"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Abstract</Label>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.deadline.abstract && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.deadline.abstract ? (
                        format(formData.deadline.abstract, "PPP")
                      ) : (
                        <span>Pick abstract deadline</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.deadline.abstract}
                      onSelect={(date) =>
                        setFormData({
                          ...formData,
                          deadline: { ...formData.deadline, abstract: date },
                        })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Full Paper</Label>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.deadline.fullPaper && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.deadline.fullPaper ? (
                        format(formData.deadline.fullPaper, "PPP")
                      ) : (
                        <span>Pick full paper deadline</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.deadline.fullPaper}
                      onSelect={(date) =>
                        setFormData({
                          ...formData,
                          deadline: { ...formData.deadline, fullPaper: date },
                        })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" form="add-conference-form">
            Add Conference
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
