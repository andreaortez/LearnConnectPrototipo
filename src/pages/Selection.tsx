import SelectionModal from './modals/SelectionModal';
import { useRouter } from 'next/router';

export default function SelectionPage() {
    const router = useRouter();

    return (
        <SelectionModal
            onClose={() => router.push('/')} // Redirige a la página de inicio al cerrar el modal
            onSelection={(data) => {
                console.log('Seleccion guardada:', data);
                router.push('/'); // Opcional: redirigir después de guardar
            }}
        />
    );
}
