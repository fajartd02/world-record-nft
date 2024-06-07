import Debug "mo:base/Debug";
import Trie "mo:base/Trie";
import List "mo:base/List";
import Nat "mo:base/Nat";

actor NFTWorldCertificate {
  // Define a record type to hold the NFT certificate details
  public type NFTCertificate = {
    ownership_id: Text;
    nft_image_certificate: Text;
    certificate_number: Text;
    issue_date: Text;
    token_id: Text;
    owner_name: Text;
    world_record: Text; // Changed to Text for dynamic content
  };

  public type RequestNewCertificate = {
    ownership_id: Text;
    nft_image_certificate: Text;
    certificate_number: Text;
    issue_date: Text;
    owner_name: Text;
    world_record: Text; // Changed to Text for dynamic content
  };

  var certificates = List.nil<NFTCertificate>();
  // Counter to generate unique token IDs
  private var tokenCounter: Nat = 0;

  private func generateTokenId(): Text {
    tokenCounter := tokenCounter + 1;
    return Nat.toText(tokenCounter);
  };

  // Function to add a new certificate
  public func mintingWorldCertificate(post : RequestNewCertificate) {
    let new_token_id = generateTokenId();
    let newCertificate: NFTCertificate = {
        ownership_id = post.ownership_id;
        nft_image_certificate = post.nft_image_certificate;
        certificate_number = post.certificate_number;
        issue_date = post.issue_date;
        owner_name = post.owner_name;
        token_id = new_token_id;
        world_record = post.world_record;
      };

    certificates := List.push<NFTCertificate>(newCertificate, certificates)
  };

  // Function to retrieve a certificate by token_id
  public shared func getCertificateByIdTokenId(token_id: Text): async ?NFTCertificate {
    return List.find<NFTCertificate>(certificates, func nft {
      nft.token_id == token_id
    });
  };
  
  public shared func getListAllCertificates(): async [NFTCertificate] {
    return List.toArray(certificates);
  };

}