package cm.odigital.serviceconnectmarket.auth.domain;

public record RegistrationCommand(
    String role,
    String prenom,
    String nom,
    String email,
    String login,
    String password,
    String language
) {
}
