package nl.hva.backend.repositories;

import nl.hva.backend.models.Preferences;
import nl.hva.backend.repositories.interfaces.SettingsRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

/**
 * @author hashim.mohammad@hva.nl
 */
@Repository
@Transactional
public class SettingsJpaRepository implements SettingsRepository {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public Preferences findById(Long id) {
        return entityManager.find(Preferences.class, id);
    }

    @Override
    public Preferences update(Preferences preferences) {
        return entityManager.merge(preferences);
    }

    @Override
    public Preferences save(Preferences preferences) {
        return entityManager.merge(preferences);
    }
}
