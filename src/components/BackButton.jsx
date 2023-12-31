import { useNavigate } from 'react-router-dom';
import Button from './Button'; // Assuming Button is in the same directory

function BackButton() {
    const navigate = useNavigate();
    const handleBackClick = (e) => {
        e.preventDefault();
        navigate(-1);
    };

    return (
        <Button type='back' onClick={handleBackClick}>&larr; Back</Button>
    )
}

export default BackButton;