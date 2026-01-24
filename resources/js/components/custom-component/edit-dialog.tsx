import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

type EditDialogProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string;
    trigger?: React.ReactNode;
    onSubmit: () => void;
    children: React.ReactNode;
};

export default function EditDialog({ open, setOpen, title, trigger, onSubmit, children }: EditDialogProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                {/* ✏️ Edit Form */}
                <div className="mt-2 space-y-3">{children}</div>

                <DialogFooter className="mt-4">
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={onSubmit}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
