import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, ChevronRight, Download } from "lucide-react"
import { Link } from "react-router"

export default function DialogConfiguration() {
    return (
        <AlertDialog>
            <AlertDialogTrigger
                render={<Button
                    variant="outline"
                    className='uppercase bg-white border-1 border-black rounded-full'
                >
                    Fine <ChevronRight />
                </Button>}
            />

            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia>
                        <CheckCircle />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Hai completato la configurazione!</AlertDialogTitle>
                    <AlertDialogDescription>
                        Ecco le azioni che puoi fare adesso:
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Link to={'/'}>Torna alla home</Link>
                    <Button><Download /> Scarica il preventivo</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
