import React, { useState, useEffect } from 'react';
import InverstorsList from '../components/investorsList';
import Iconos from '../elements/iconos';
import Propuesta from './propuesta';
import RiskProfile from "../components/RiskProfile";
import axios from 'axios';

interface Proyecto {
    project_id: string;
    nombre: string;
    imagen: string;
    sector: string;
    meta: number;
    descripcion: string;
    recaudado: string;
    estado: number;
    empresa: string;
    inversionistas: Inversionista[];
    onClose: () => void;
}

interface Inversionista {
    id: string;
    nombre: string,
    apellido: string,
    avatar: string,
}
interface RiskProfileData {
    nivelDeRiesgo: "bajo" | "medio" | "alto";
    estadoDeFinanciamiento: string;
    estadoDeInversionistas: string;
    puntajeDeRiesgo: number;
}

export default function verProyecto({ project_id, nombre, imagen, sector, meta, descripcion, recaudado, estado, empresa, inversionistas, onClose }: Proyecto) {
    const [estadoString, setEstadoString] = useState<string>('');
    const [showPropuesta, setPropuesta] = useState<boolean>(false);
    const investor_id = sessionStorage.getItem("tipo_id") || "";

    const tipo = sessionStorage.getItem("tipo");
    const [Pyme, setPyme] = useState<boolean>(false);
    const [Inversionista, setInversionista] = useState<boolean>(false);

    //Perfil de Riesgo
    const [riskProfile, setRiskProfile] = useState<RiskProfileData | null>(null);
    const [loadingRiskProfile, setLoadingRiskProfile] = useState<boolean>(true);

    console.log("Ver Proyecto:", inversionistas)

    useEffect(() => {
        const fetchRiskProfile = async () => {
            try {
                setLoadingRiskProfile(true);
                const response = await axios.get(`http://localhost:3001/PerfilRiesgo`, {
                    params: { project_id }
                });
                console.log("Perfil de Riesgo:", response)
                const data: RiskProfileData = response.data.riskProfile;
                setRiskProfile(data);
            } catch (error) {
                console.error("Error fetching risk profile:", error);
            } finally {
                setLoadingRiskProfile(false);
            }
        };

        fetchRiskProfile();
    }, [project_id]);


    useEffect(() => {
        if (tipo === "Inversionista") {
            setPyme(false);
            setInversionista(true);
        } else {//pyme
            setPyme(true);
            setInversionista(false);
        }
    }, [tipo]);

    useEffect(() => {
        switch (estado) {
            case 1:
                setEstadoString("Proyecto Abierto");
                break;
            case 2:
                setEstadoString("Proyecto en Ejecución");
                break;
            case 3:
                setEstadoString("Proyecto Cerrado");
                break;
            default:
                setEstadoString("Estado desconocido");
                break;
        }
    }, [estado]);

    return (
        <>
            <div className="modal show d-block" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                        </div>
                        <div className='d-flex'>
                            {/* informacion */}
                            <div className="modal-body border-end col-md-8">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={`${imagen}`} alt="Imagen" className="img-fluid rounded-start" />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <div className="hstack gap-2 d-flex align-items-center">
                                                <svg width="40" height="40">
                                                    <circle cx="15" cy="15" r="15" fill="#15ae5d"></circle>
                                                </svg>
                                                <h5 className="card-text">{estadoString}</h5>
                                            </div>

                                            <h5 className="card-title">{nombre}</h5>
                                            <p className="card-text">{empresa}</p>

                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className='hstack justify-content-between'>
                                            <Iconos imagen={"./imagenes/objetivos.png"} texto={"L. " + `${meta}`} />
                                            <Iconos imagen={"./imagenes/mano.png"} texto={"L. " + `${recaudado}`} />
                                            <Iconos imagen={"./imagenes/dinero.png"} texto={`${sector}`} />
                                        </div>
                                        <p className="card-text"><small className="text-body-secondary">{`${descripcion}`}</small></p>
                                        <div className='d-flex justify-content-center align-items-center mt-3'>
                                            {loadingRiskProfile ? (
                                                <p>Cargando perfil de riesgo...</p>
                                            ) : riskProfile ? (
                                                <RiskProfile profile={riskProfile} />
                                            ) : (
                                                <p>No se pudo cargar el perfil de riesgo.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Lista de inversionistas */}
                            <div className="container mt-4 col-md-4 position-relative top-0">
                                <h2>Inversionistas</h2>
                                <p className="textColor">{inversionistas.length} inversionistas</p>
                                <div className="list-group overflow-auto"
                                    style={{ maxHeight: '400px' }}
                                    data-bs-spy="scroll">
                                    {inversionistas.length === 0 ? (
                                        <p>No existen inversionistas para este proyecto.</p>
                                    ) : (
                                        inversionistas.map((inversionista) => (
                                            <InverstorsList
                                                key={inversionista.id}
                                                user={{
                                                    nombre: inversionista.nombre,
                                                    apellido: inversionista.apellido,
                                                    id: inversionista.id,
                                                    avatar: inversionista.avatar
                                                }}

                                            />
                                        ))
                                    )}
                                </div>
                            </div>

                        </div>
                        {Inversionista && (
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" onClick={() => {
                                    setPropuesta(true);
                                }}>
                                    Realizar Propuesta</button>
                            </div>
                        )}
                    </div>
                </div>
            </div >

            {/* Realizar Propuesta*/}
            {showPropuesta && <Propuesta project_id={project_id} investor_id={investor_id} onClose={() => { setPropuesta(false) }} />}
        </>
    );
};