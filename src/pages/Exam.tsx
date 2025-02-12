import ExamModal from './modals/ExamModal';
import { useRouter } from 'next/router';

export default function ExamPage() {
    const router = useRouter();

    return (
        <ExamModal
            onClose={() => router.push('/')} // Redirige a la página de inicio al cerrar el modal
            onSave={(data) => {
                console.log('Examen guardado:', data);
                router.push('/'); // Opcional: redirigir después de guardar
            }}
        />
    );
}
