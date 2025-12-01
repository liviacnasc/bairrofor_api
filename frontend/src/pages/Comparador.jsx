import { use, useEffect, useState } from "react";
import Mapa from "../components/Mapa.jsx";
import ComparadorService from "../services/comparador.jsx";
import Navbar from "../components/Navbar.jsx";

function Form({ onChangeCallback, values }) {
    return (
        <div className="gap-4">
            <div className="flex flex-row gap-2">
                <input value={values.numero} name="numero" type="number" placeholder="Nº" className="input w-1/4" onChange={onChangeCallback} min={0} required />
                <input value={values.cep} name="cep" type="text" placeholder="CEP" className="input validator" pattern="\d{5}-\d{3}" minlength="8" maxlength="9" onChange={onChangeCallback} required />
            </div>
        </div>
    )
}

export default function Comparador() {
    const { comparar } = ComparadorService();

    const [resultado, setResultado] = useState(null)
    const [origemData, setOrigemData] = useState({})
    const [destinoData, setDestinoData] = useState({})
    const [interesseData, setInteresseData] = useState({})
    const [loading, setLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (resultado && !resultado.success) {
            setShowAlert(true);

            const timeout = setTimeout(() => {
                setShowAlert(false);
            }, 10000); // 4 segundos

            // limpeza caso o componente seja desmontado ou resultado mude rápido
            return () => clearTimeout(timeout);
        }
    }, [resultado]);

    const handleChange = (setState) => (event) => {
        setState(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)

        const data = {
            origem: origemData,
            destino: destinoData,
            localInteresse: interesseData
        }

        const resultado = await comparar(data);

        setResultado(resultado);
        setLoading(false)
    }

    return (
        <div className="h-dhv">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer-3" className="z-10 absolute right-0 top-10 btn rounded-s-lg drawer-button lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 opacity-40"><path d="M17.97 9.304A8 8 0 0 0 2 10c0 4.69 4.887 9.562 7.022 11.468" /><path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" /><circle cx="10" cy="10" r="3" /></svg>
                    </label>
                    {showAlert && (
                        <div role="alert" className="alert alert-error absolute bottom-1 right-1 z-99">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{resultado?.message}</span>
                        </div>
                    )}
                    {loading ? (
                        <span class="loading loading-ring loading-xl"></span>
                    ) :
                        (
                            <Mapa resultado={resultado?.dadosBairros} loading={loading} />
                        )}
                </div>
                <div className="drawer-side">
                    <div className="min-h-full w-screen lg:w-100 p-4 gap-4 bg-base-100">
                        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 opacity-40"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </label>
                        <div>
                            {resultado &&
                                <div>
                                    <div class="font-sm font-semibold">Resultados</div>
                                    <ul class="list">
                                        <li class="list-row">
                                            <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 opacity-40"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><path d="M16 3.128a4 4 0 0 1 0 7.744" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><circle cx="9" cy="7" r="4" /></svg></div>
                                            <div>
                                                <div>População</div>
                                            </div>
                                            <div class="text-xs uppercase font-semibold opacity-60">{resultado?.resultadosComparacao?.populacao}</div>
                                        </li>
                                        <li class="list-row">
                                            <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 opacity-40"><path d="m12 8 6-3-6-3v10" /><path d="m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12" /><path d="m6.49 12.85 11.02 6.3" /><path d="M17.51 12.85 6.5 19.15" /></svg></div>
                                            <div>
                                                <div>Área</div>
                                            </div>
                                            <div class="text-xs uppercase font-semibold opacity-60">{resultado?.resultadosComparacao?.area}</div>
                                        </li>
                                        <li class="list-row">
                                            <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 opacity-40"><circle cx="12" cy="5" r="1" /><path d="m9 20 3-6 3 6" /><path d="m6 8 6 2 6-2" /><path d="M12 10v4" /></svg></div>
                                            <div>
                                                <div>IDH</div>
                                            </div>
                                            <div class="text-xs uppercase font-semibold opacity-60">{resultado?.resultadosComparacao?.idh}</div>
                                        </li>
                                        <li class="list-row">
                                            <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 opacity-40"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" /><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" /><path d="m2 16 6 6" /><circle cx="16" cy="9" r="2.9" /><circle cx="6" cy="5" r="3" /></svg></div>
                                            <div>
                                                <div>IDH Renda</div>
                                            </div>
                                            <div class="text-xs uppercase font-semibold opacity-60">{resultado?.resultadosComparacao?.idhRenda}</div>
                                        </li>
                                        <li class="list-row">
                                            <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 opacity-40"><rect width="8" height="18" x="3" y="3" rx="1" /><path d="M7 3v18" /><path d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z" /></svg></div>
                                            <div>
                                                <div>IDH Educação</div>
                                            </div>
                                            <div class="text-xs uppercase font-semibold opacity-60">{resultado?.resultadosComparacao?.idhEducacao}</div>
                                        </li>
                                    </ul>
                                </div>
                            }
                            <div class="collapse collapse-arrow">
                                <input type="checkbox" />
                                <div class="collapse-title font-semibold">Endereços</div>
                                <div class="collapse-content text-sm">
                                    <form onSubmit={onSubmit}>
                                        <div>
                                            <div className="flex items-center gap-2 py-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 opacity-40"><path d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z" /><path d="M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2" /><path d="M18 22v-3" /><circle cx="10" cy="10" r="3" /></svg>
                                                Origem
                                            </div>
                                            <Form onChangeCallback={handleChange(setOrigemData)} values={origemData} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 py-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 opacity-40"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>
                                                Destino
                                            </div>
                                            <Form onChangeCallback={handleChange(setDestinoData)} values={destinoData} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 py-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 opacity-40"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>

                                                Local de Interesse
                                            </div>
                                            <Form onChangeCallback={handleChange(setInteresseData)} values={interesseData} />
                                        </div>

                                        <div className="grid mt-8">
                                            <button type="submit" className="btn btn-primary" disabled={loading}>Confirmar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}