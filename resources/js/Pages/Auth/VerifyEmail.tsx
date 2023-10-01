import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";
import { useToast } from "@/Components/ui/use-toast";
import { Button } from "@/Components/ui/button";
import { Loader2 } from "lucide-react";

export default function VerifyEmail({ status }: { status?: string }) {
	const { post, processing } = useForm({});
	const { toast } = useToast();

	const submit: FormEventHandler = (e) => {
		e.preventDefault();

		post(route("verification.send"));
	};

	useEffect(() => {
		if (status === "verification-link-sent") {
			toast({
				title: "Reenviado",
				description:
					"Un nuevo enlace de verificación ha sido enviado al correo electrónico que has registrado.",
			});
		}
	}, [status, toast]);

	return (
		<GuestLayout
			title="Verificación de Correo"
			description="Para comenzar a utilizar la aplicación, confirma tu dirección de correo electrónico abriendo el enlace que te hemos enviado."
		>
			<Head title="Verificación de Correo" />

			<form onSubmit={submit}>
				<div className="flex justify-between">
					<Button disabled={processing}>
						{processing ? (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						) : null}

						<span>Reenviar correo</span>
					</Button>

					<Button asChild variant="ghost">
						<Link href={route("logout")} method="post" as="button">
							Cerrar Sesión
						</Link>
					</Button>
				</div>
			</form>
		</GuestLayout>
	);
}
