import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ConfigurationService } from "@/features/configurations/configuration.service";
import { QuoteService } from "@/features/quotes/quote.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle, ChevronRight, Download } from "lucide-react";
import { Link, useLocation } from "react-router";
import { toast } from "sonner";

type DialogConfigurationProps = {
    configurationId: number
}
export default function DialogConfiguration({ configurationId }: DialogConfigurationProps) {

    const location = useLocation();

    const isConfigurations = location.pathname.startsWith("/le-mie-configurazioni");

    const queryClient = useQueryClient();

    const { data: configuration } = useQuery({
        queryFn: () => ConfigurationService.show(configurationId),
        queryKey: ['configuration', configurationId]
    })

    const generateQuoteMutation = useMutation({
        mutationFn: QuoteService.generate,
        onSuccess: async (quote) => {

            queryClient.invalidateQueries({
                queryKey: ['configuration', configurationId]
            });
            const blob = await QuoteService.download(quote.id);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `preventivo-${configuration.model.name}${configuration.engine.name}.pdf`;

            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            toast.success("Preventivo scaricato con successo");
        },
        onError: () => {
            toast.error("Errore nel download del preventivo");
        }
    });

    return (
        isConfigurations ? (
            <Button onClick={() => generateQuoteMutation.mutate(configurationId)} size={'icon'} className={'my-auto'}>
                <Download />
            </Button>
        ) : (
            <AlertDialog>
                <AlertDialogTrigger
                    render={<Button
                        variant="outline"
                        className='uppercase bg-white border-1 border-black rounded-full'
                        disabled={!configuration?.model_id || !configuration?.color_id || !configuration?.engine_variant_id}
                    >
                        Fine <ChevronRight />
                    </Button>}
                />

                <AlertDialogContent size="default">
                    <AlertDialogHeader>
                        <AlertDialogMedia>
                            <CheckCircle />
                        </AlertDialogMedia>
                        <AlertDialogTitle>Hai completato la configurazione!</AlertDialogTitle>
                        <AlertDialogDescription>
                            Ecco le azioni che puoi fare adesso:
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="justify-between">
                        <Link to={'/'} className="text-start">Torna alla home</Link>
                        <Button onClick={() => generateQuoteMutation.mutate(configurationId)}>
                            <Download /> Scarica il preventivo
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        )

    )
}

/* 
<AlertDialog>
            <AlertDialogTrigger
                render={<Button
                    variant="outline"
                    className='uppercase bg-white border-1 border-black rounded-full'
                >
                    Fine <ChevronRight />
                </Button>}
            />

            <AlertDialogContent size="default">
                <AlertDialogHeader>
                    <AlertDialogMedia>
                        <CheckCircle />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Hai completato la configurazione!</AlertDialogTitle>
                    <AlertDialogDescription>
                        Ecco le azioni che puoi fare adesso:
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="justify-between">
                    <Link to={'/'} className="text-start">Torna alla home</Link>
                    <Button onClick={() => generateQuoteMutation.mutate(configurationId)}>
                        <Download /> Scarica il preventivo
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
         */
