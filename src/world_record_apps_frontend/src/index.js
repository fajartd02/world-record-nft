import { world_record_apps_backend } from "../../declarations/world_record_apps_backend";
import { v4 as uuidv4 } from 'uuid';

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("button");

  const personName = document.getElementById("person_name").value.toString();
  const issueDate = document.getElementById("issue_date").value.toString();
  const certificateNumber = document.getElementById("certificate_number").value.toString();
  const worldRecordName = document.getElementById("world_record_name").value.toString();
  const repetition = document.getElementById("repetition").value.toString();
  const place = document.getElementById("place").value.toString();
  const imageGenerate = document.getElementById("image-generate") ? document.getElementById("image-generate").value.toString() : "";

  button.setAttribute("disabled", true);

  // Create a JSON object for the worldRecord details
  const worldRecord = JSON.stringify({
    worldRecordName: worldRecordName,
    place: place,
    repetition: repetition
  });

  const ownershipId = uuidv4();

  const newCertificate = {
    ownership_id: ownershipId,
    nft_image_certificate: imageGenerate,
    certificate_number: certificateNumber,
    issue_date: issueDate,
    owner_name: personName,
    world_record: worldRecord
  };

  try {
    await world_record_apps_backend.mintingWorldCertificate(newCertificate);
    const greeting = `New certificate minted successfully!`;
    document.getElementById("greeting").innerText = greeting;
  } catch (error) {
    console.error("Error minting certificate:", error);
    document.getElementById("greeting").innerText = "Failed to mint certificate.";
  }

  button.removeAttribute("disabled");
});
