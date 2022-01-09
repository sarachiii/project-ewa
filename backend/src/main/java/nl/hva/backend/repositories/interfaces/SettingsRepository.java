package nl.hva.backend.repositories.interfaces;

import nl.hva.backend.models.Preferences;

/**
 * @author hashim.mohammad@hva.nl
 */
public interface SettingsRepository {
    Preferences findById(Long id);
    Preferences update(Preferences preferences);
    Preferences save(Preferences preferences);
}
