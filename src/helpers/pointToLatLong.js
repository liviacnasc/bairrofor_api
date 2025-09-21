import proj4 from "proj4";

export function pointToLatLong(value) {

    proj4.defs("EPSG:31984","+proj=utm +zone=24 +south +datum=SIRGAS2000 +units=m +no_defs");

    const values = value.replace("[^\d\.\s]","").trim().split(" ");

    const [lon, lat] = proj4("EPSG:31984", "EPSG:4326", [x, y]);

}