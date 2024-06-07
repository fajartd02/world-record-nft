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

// Function to fetch and display all certificates
async function fetchAndDisplayCertificates() {
  try {
    const certificates = await world_record_apps_backend.getListAllCertificates();
    const certificateList = document.getElementById("certificate-list");
    certificateList.innerHTML = "";

    certificates.forEach(certificate => {
      const certificateElement = document.createElement("div");
      certificateElement.className = "certificate";

      certificateElement.innerHTML = `
        <p><strong>Ownership ID:</strong> ${certificate.ownership_id}</p> <br/>
        <p><strong>Issue Date:</strong> ${certificate.issue_date}</p> <br/>
        <p><strong>Certificate Number:</strong> ${certificate.certificate_number}</p> <br/>
        <p><strong>Owner Name:</strong> ${certificate.owner_name}</p> <br/>
        <p><strong>World Record:</strong> ${certificate.world_record}</p> <br/>
        <p><strong>Token ID:</strong> ${certificate.token_id}</p> <br/>
        <img src="${certificate.nft_image_certificate}" alt="NFT Image" /> <br/><br/>
      `;

      certificateList.appendChild(certificateElement);
    });
  } catch (error) {
    console.error("Error fetching certificates:", error);
    document.getElementById("certificate-list").innerText = "Failed to load certificates.";
  }
}

// Function to toggle the visibility of the certificates section
document.getElementById("toggle-certificates").addEventListener("click", () => {
  const certificatesSection = document.getElementById("certificates");
  if (certificatesSection.style.display === "none") {
    certificatesSection.style.display = "block";
    document.getElementById("toggle-certificates").innerText = "Hide Certificates";
    fetchAndDisplayCertificates();
  } else {
    certificatesSection.style.display = "none";
    document.getElementById("toggle-certificates").innerText = "Show Certificates";
  }
});

// Initial fetch and display of certificates when the page loads
document.addEventListener("DOMContentLoaded", fetchAndDisplayCertificates);