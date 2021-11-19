package nl.hva.backend.repositories.interfaces;

import nl.hva.backend.models.Preferences;

/**
 * This class <description of functionality>
 *
 * @author hashim.mohammad@hva.nl
 */
public interface SettingsRepository {
    Preferences findById(Long id);
    Preferences update(Preferences preferences);
}
