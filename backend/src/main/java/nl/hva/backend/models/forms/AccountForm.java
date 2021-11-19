package nl.hva.backend.models.forms;

import javax.validation.constraints.*;

/**
 * This class <description of functionality>
 *
 * @author hashim.mohammad@hva.nl
 */
public class AccountForm {
    @NotBlank(message = "First name is required")
    private String firstName;
    @NotBlank(message = "Last name is required")
    private String lastName;
    @NotNull
    private PictureForm pictureForm;
    @NotBlank
    @Email(message = "Email is invalid!\nFormat: name@example.com")
    private String emailAddress;
    @NotBlank(message = "Password is required")
    private String password;
    @NotNull
    private NewPasswordForm newPasswordForm;

    public static class PictureForm {
        // Add custom validation
        private String file;
        private String url;

        public PictureForm(String file, String url) {
            this.file = file;
            this.url = url;
        }

        protected PictureForm() {
            this("", "");
        }

        public String getFile() {
            return file;
        }

        public void setFile(String file) {
            this.file = file;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }
    }

    public static class NewPasswordForm {
        @Size(min = 8, message = "Must be at least 8 characters long")
        @Pattern(regexp = "[0-9]", message = "Must contain a number")
        @Pattern(regexp = "[a-z]", message = "Must contain a lowercase character")
        @Pattern(regexp = "[A-Z]", message = "Must contain an uppercase character")
        @Pattern(regexp = "[a-zA-Z0-9!@#$%&_=+?~-]+", message = "May only contain these special characters: (!@#$%&_=+?~-)")
        private String password;
        private String confirmPassword;

        public NewPasswordForm(String password, String confirmPassword) {
            this.password = password;
            this.confirmPassword = confirmPassword;
        }

        protected NewPasswordForm() {
            this("", "");
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getConfirmPassword() {
            return confirmPassword;
        }

        public void setConfirmPassword(String confirmPassword) {
            this.confirmPassword = confirmPassword;
        }
    }

    public AccountForm(String firstName, String lastName, PictureForm pictureForm,
                       String emailAddress, String password, NewPasswordForm newPasswordForm) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.pictureForm = pictureForm;
        this.emailAddress = emailAddress;
        this.password = password;
        this.newPasswordForm = newPasswordForm;
    }

    protected AccountForm() {
        this("", "", new PictureForm(), "", "", new NewPasswordForm());
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public PictureForm getPictureForm() {
        return pictureForm;
    }

    public void setPictureForm(PictureForm pictureForm) {
        this.pictureForm = pictureForm;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public NewPasswordForm getNewPasswordForm() {
        return newPasswordForm;
    }

    public void setNewPasswordForm(NewPasswordForm newPasswordForm) {
        this.newPasswordForm = newPasswordForm;
    }
}
