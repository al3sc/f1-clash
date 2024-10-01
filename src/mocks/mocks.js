import { loadCsvData } from "./csvLoader";

async function getAllCircuits() {
  try {
    const data = await loadCsvData("circuits.csv")
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error loading CSV circuits: ", error)
  }
}

async function getAllDrivers() {
  try {
    const data = await loadCsvData("drivers.csv")
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error loading CSV drivers: ", error)
  }
}

async function getAllComponents() {
  try {
    const data = await loadCsvData("components.csv")
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error loading CSV components: ", error)
  }
}


const CIRCUITS = [
  {
    id: 0,
    name: "DESERTO DEL SAHKIR",
    place: "BAHREIN",
    stats: {
      driver: "Sorpasso",
      car: "Power Unit"
    }
  },
  {
    id: 1,
    name: "MELBOURNE",
    place: "AUSTRALIA",
    stats: {
      driver: "Difesa",
      car: "Power Unit"
    },
  },
  {
    id: 2,
    name: "MIAMI",
    place: "USA",
    stats: {
      driver: "Partenza",
      car: "Power Unit"
    },
  },
  {
    id: 3,
    name: "SILVERSTONE",
    place: "REGNO UNITO",
    stats: {
      driver: "Gestione Pneumatici",
      car: "Power Unit"
    },
  },
  
]

const COMPONENTS = {
  freni: [
    {id: "freni_1", name: "The Stabiliser"},
    {id: "freni_2", name: "The Corsair"},
    {id: "freni_3", name: "The Fury"},
    {id: "freni_4", name: "Monolith"},
    {id: "freni_5", name: "The Dynamo"},
    {id: "freni_6", name: "Stormbringer"},
    {id: "freni_7", name: "The Behemoth"},
  ],
  cambio: [
    {id: "cambio_1", name: "The Equinox"},
    {id: "cambio_2", name: "Cold Fusion"},
    {id: "cambio_3", name: "Pivot"},
    {id: "cambio_4", name: "The Surge"},
    {id: "cambio_5", name: "The Quantum"},
    {id: "cambio_6", name: "The Gyro"},
    {id: "cambio_7", name: "Beat"},
    
  ],
  alettonePosteriore: [
    {id: "alettonePosteriore_1", name: "The Blaze"},
    {id: "alettonePosteriore_2", name: "The Spire"},
    {id: "alettonePosteriore_3", name: "Motion"},
    {id: "alettonePosteriore_4", name: "Aero Blade"},
    {id: "alettonePosteriore_5", name: "The Valkyrie"},
    {id: "alettonePosteriore_6", name: "Power Lift"},
    {id: "alettonePosteriore_7", name: "The Cyclone"},
  ],
  alettoneAnteriore: [
    {id: "alettoneAnteriore_1", name: "Glide"},
    {id: "alettoneAnteriore_2", name: "Gallop"},
    {id: "alettoneAnteriore_3", name: "Spark-E"},
    {id: "alettoneAnteriore_4", name: "The Saber"},
    {id: "alettoneAnteriore_5", name: "Turbo Jet"},
    {id: "alettoneAnteriore_6", name: "The Beast"},
    {id: "alettoneAnteriore_7", name: "Nemesis"},
  ],
  sospensioni: [
    {id: "sospensioni_1", name: "Zenith"},
    {id: "sospensioni_2", name: "Nexus"},
    {id: "sospensioni_3", name: "Curver 2.0"},
    {id: "sospensioni_4", name: "The Pulse"},
    {id: "sospensioni_5", name: "Hustle"},
    {id: "sospensioni_6", name: "The Arc"},
    {id: "sospensioni_7", name: "The Reactor"},
  ],
  motore: [
    {id: "motore_1", name: "The Synergy"},
    {id: "motore_2", name: "The Accord"},
    {id: "motore_3", name: "Thunderbolt"},
    {id: "motore_4", name: "M4D Dash"},
    {id: "motore_5", name: "The Jeggernaut"},
    {id: "motore_6", name: "Mach III"},
    {id: "motore_7", name: "The Powerhouse"},
  ]
}

export { CIRCUITS, COMPONENTS };