import SummaryModal from './modals/SummaryModal';
import { useRouter } from 'next/router';

export default function SummaryPage() {
    const router = useRouter();

    return (
        <SummaryModal
            onClose={() => router.push('/')} // Redirige a la página de inicio al cerrar el modal
            onSave={(data) => {
                console.log('Resumen guardado:', data);
                router.push('/'); // Opcional: redirigir después de guardar
            }}
        />
    );
}
