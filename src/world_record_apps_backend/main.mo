import Debug "mo:base/Debug";
import Trie "mo:base/Trie";
import List "mo:base/List";

actor NFTWorldCertificate {
  // Define a record type to hold the NFT certificate details
  public type NFTCertificate = {
    ownership_id: Text;
    nft_image_certificate: Text;
    certificate_number: Text;
    issue_date: Text;
    token_id: Text;
    world_record: Text; // Changed to Text for dynamic content
  };

  var certificates = List.nil<NFTCertificate>() ;

  // Function to add a new certificate
  public func createWorldCertificate(post : NFTCertificate) {
    certificates := List.push<NFTCertificate>(post, certificates)
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