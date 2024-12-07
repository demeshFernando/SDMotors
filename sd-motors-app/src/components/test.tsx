function isValidJSON(jsonString: string): boolean {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (e) {
    return false;
  }
}

interface Person {
  name: string;
  age: number;
}

const isPerson = (obj: any): obj is Person => {
  return typeof obj.name === "string" && typeof obj.age === "number";
};

function parsePerson(jsonString: string): Person | null {
  if (!isValidJSON(jsonString)) {
    console.error("Invalid JSON string");
    return null;
  }

  const parsed = JSON.parse(jsonString);

  if (isPerson(parsed)) {
    return parsed;
  } else {
    console.error("JSON does not match Person interface");
    return null;
  }
}

const parsePersonWithDefaults = (jsonString: string): Person => {
  const defaultPerson: Person = { name: "Unknown", age: 0 };

  if (!isValidJSON(jsonString)) {
    console.error("Invalid JSON string, using default values");
    return defaultPerson;
  }

  const parsed = JSON.parse(jsonString);

  if (isPerson(parsed)) {
    return {
      name: parsed.name ?? defaultPerson.name,
      age: parsed.age ?? defaultPerson.age,
    };
  } else {
    console.error("JSON does not match Person interface, using default values");
    return defaultPerson;
  }
};
