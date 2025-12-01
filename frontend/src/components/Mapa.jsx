import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap, Tooltip } from 'react-leaflet';
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import ComparadorService from '../services/comparador.jsx';

function LimitarMapa({ shape }) {
    const map = useMap();

    useEffect(() => {
        if (!shape) return;

        // pegando os limites da cidade
        const bounds = L.geoJSON(shape).getBounds();

        // centraliza a visão em Fortaleza
        map.fitBounds(bounds);

        // bloqueia o usuário dentro dessa área
        map.setMaxBounds(bounds.pad(0.3));
        // padding 0.3 deixa o arrasto um pouquinho mais flexível.

        // evita zoom out exagerado
        map.setMinZoom(map.getZoom());

    }, [shape]);

    return null;
}

export function MascaraFortaleza({ fortalezaGeoJson }) {
    const worldPolygon = [
        [-90, -180],
        [90, -180],
        [90, 180],
        [-90, 180],
    ];

    // Fortaleza invertida
    const mask = {
        type: "Feature",
        geometry: {
            type: "Polygon",
            coordinates: [
                worldPolygon,
                ...fortalezaGeoJson.features[0].geometry.coordinates[0]
            ]
        }
    };

    return (
        <GeoJSON
            data={mask}
            style={{
                fillColor: "#009689",
                fillOpacity: 0.5,
                color: "transparent"
            }}
        />
    );
}

const redIcon = new L.Icon({
  iconUrl: "/marker-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "/marker-shadow.png",
});

export default function Mapa({ resultado, loading }) {
    const [shape, setShape] = useState(null);
    const [bairroShape, setBairroShape] = useState(null)

    useEffect(() => {
        fetch("/fortaleza.geojson")
            .then(res => res.json())
            .then(data => setShape(data));

        fetch("/Bairros_de_Fortaleza (1).geojson")
            .then(res => res.json())
            .then(data => setBairroShape(data));

    }, []);

    const bairrosFiltrados = {
        type: "FeatureCollection",
        features: bairroShape?.features
            ?.filter(feat =>
                resultado?.some(r => Number(r.dadosBairro.id_pmf) === feat.properties.id)
            )
            ?.map(feat => {
                // Encontra o resultado correspondente ao bairro
                const correspondente = resultado.find(
                    r => Number(r.dadosBairro.id_pmf) === feat.properties.id
                );

                // Retorna a feature com propriedades expandidas
                return {
                    ...feat,
                    properties: {
                        ...feat.properties,
                        indicador: correspondente?.dadosBairro.indicador,
                    }
                };
            })
    };

    const url = `https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.jpg?key=${import.meta.env.VITE_MAPTILE_API_KEY}`;

    return (
        <MapContainer
            className="relative w-full h-full z-1"
            center={[-3.7909, -38.5648]}
            zoom={12}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={url}
            />
            {shape && (
                <>
                    <MascaraFortaleza fortalezaGeoJson={shape} />

                    <GeoJSON data={shape} style={{ color: "#009689", weight: 3, fillOpacity: 0 }} />

                    <LimitarMapa shape={shape} />
                </>
            )}


            {resultado?.map((localidade, index) => (
                <React.Fragment key={index}>

                    {bairroShape && bairrosFiltrados && (
                        <GeoJSON
                            data={bairrosFiltrados}
                            style={{
                                color: "#ff0000",
                                weight: 2,
                                fillColor: "#ff0000",
                                fillOpacity: 0.1
                            }}

                            onEachFeature={(feature, layer) => {
                                const html = ReactDOMServer.renderToString(
                                    <ul>
                                        <li className="flex flex-col">
                                            <div className="text-base uppercase font-bold">
                                                {feature.properties.Nome}
                                            </div>
                                            <div className='flex-row'>
                                                <div className='font-bold'>População</div>
                                                <div className="text-xs uppercase opacity-60 ml-2">
                                                    {feature.properties.indicador.populacao.populacao}
                                                </div>
                                            </div>
                                            <div className='flex-row'>
                                                <div className='font-bold'>Território</div>
                                                <div className='ml-2'>
                                                    <div className="text-xs uppercase opacity-60">
                                                        Área: {feature.properties.indicador.territorio.area}km
                                                    </div>
                                                    <div className="text-xs uppercase opacity-60">
                                                        Regional antiga: {feature.properties.indicador.territorio.regional_antiga}
                                                    </div>
                                                    <div className="text-xs uppercase opacity-60">
                                                        Regional atual: {feature.properties.indicador.territorio.regional_atual}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex-row'>
                                                <div className='font-bold'>Socioeconômico</div>
                                                <div className='ml-2'>
                                                    <div className="text-xs uppercase opacity-60">
                                                        IDH: {feature.properties.indicador.socioeconomico.idh}
                                                    </div>
                                                    <div className="text-xs uppercase opacity-60">
                                                        IDH Renda: {feature.properties.indicador.socioeconomico.idh_renda}
                                                    </div>
                                                    <div className="text-xs uppercase opacity-60">
                                                        IDH Educação: {feature.properties.indicador.socioeconomico.idh_educacao}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                );
                                layer.bindPopup(html);
                            }}
                        />
                    )}

                    <Marker
                        position={[
                            Number(localidade.coordenadas.lat),
                            Number(localidade.coordenadas.long)
                        ]}
                    ></Marker>
                </React.Fragment>
            ))}
        </MapContainer>
    )
}