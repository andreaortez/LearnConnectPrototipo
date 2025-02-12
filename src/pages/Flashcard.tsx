import FlashcardModal from './modals/FlashcardModal';
import { useRouter } from 'next/router';

export default function FlashcardPage() {
    const router = useRouter();

    return (
        <FlashcardModal
            onClose={() => router.push('/')} // Redirige a la página de inicio al cerrar el modal
            onSave={(data) => {
                console.log('Flashcard guardada:', data);
                router.push('/'); // Opcional: redirigir después de guardar
            }}
        />
    );
}
