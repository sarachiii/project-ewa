package nl.hva.backend.rest;

import nl.hva.backend.models.Preferences;
import nl.hva.backend.repositories.interfaces.SettingsRepository;
import nl.hva.backend.rest.exception.PreConditionFailed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * This class <description of functionality>
 *
 * @author hashim.mohammad@hva.nl
 */
@RestController
@RequestMapping("users/preferences")
public class SettingsController {
    @Autowired
    SettingsRepository repository;

    @GetMapping()
    public ResponseEntity<Preferences> getPreferences(@RequestParam Long id) {
        if (id == null){
            throw new PreConditionFailed("Param id not given");
        }
        return ResponseEntity.ok().body(repository.findById(id));
    }

    @PutMapping()
    public Preferences updatePreferences(@RequestBody Preferences preferences) {
        if (preferences.getUserId() == null){
            throw new PreConditionFailed("User doesn't exist");
        }
        return repository.update(preferences);
    }
}
