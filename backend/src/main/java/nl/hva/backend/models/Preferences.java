package nl.hva.backend.models;

import javax.persistence.*;

/**
 * This class <description of functionality>
 *
 * @author hashim.mohammad@hva.nl
 */
@Entity
@Table(name = "settings")
public class Preferences {
    @Id
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "language")
    @Enumerated(EnumType.STRING)
    private LanguageCode languageCode;

    private Boolean colorblindness;

    @Column(name = "dark_mode")
    private Boolean darkMode;

    @OneToOne(cascade = CascadeType.ALL)
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    public enum LanguageCode {
        en_GB("en_GB"),
        nl_NL("nl_NL");

        private final String string;

        LanguageCode(String string) {
            this.string = string;
        }

        @Override
        public String toString() {
            return this.string;
        }
    }

    public Preferences(Long userId, LanguageCode languageCode, Boolean colorblindness, Boolean darkMode) {
        this.userId = userId;
        this.languageCode = languageCode;
        this.colorblindness = colorblindness;
        this.darkMode = darkMode;
    }

    public Preferences(Long userId, Boolean colorblindness, Boolean darkMode) {
        this(userId, LanguageCode.en_GB, colorblindness, darkMode);
    }

    public Preferences(Long userId, LanguageCode languageCode) {
        this(userId, languageCode, false, false);
    }

    public Preferences(Long userId) {
        this(userId, LanguageCode.en_GB);
    }

    public Preferences(User user) {
        this(user.getId());
        this.user = user;
    }

    protected Preferences() {
        this(0L);
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LanguageCode getLanguageCode() {
        return languageCode;
    }

    public void setLanguageCode(LanguageCode languageCode) {
        this.languageCode = languageCode;
    }

    public Boolean getColorblindness() {
        return colorblindness;
    }

    public void setColorblindness(Boolean colorblindness) {
        this.colorblindness = colorblindness;
    }

    public Boolean getDarkMode() {
        return darkMode;
    }

    public void setDarkMode(Boolean darkMode) {
        this.darkMode = darkMode;
    }
}
