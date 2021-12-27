package nl.hva.backend;

import nl.hva.backend.repositories.NotesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {

    @Autowired
    NotesRepository repository;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        /**FIND ALL NOTES*/
        logger.info("all notes -> {}", repository.findAll());

        /**INSERTING OR UPDATING A NOTE*/
//        LocalDateTime ldt = LocalDateTime.now();
//        Date test = Date.valueOf(DateTimeFormatter.ofPattern("yyyy-MM-dd", Locale.ENGLISH).format(ldt));
//        logger.info("inserting 7 -> {}", repository.insertOrUpdateNote(new Note(7, 1, "A", test,
//                "Changed the lighting color",
//                "The lighting color is changed from white to yellow but it did not effect the CO2 level.")));
//
//        logger.info("inserting 4 -> {}", repository.insertOrUpdateNote(new Note(4, 1, "A", test,
//                "Heat wave",
//                "The sudden change in weather made the temperature rise at the greenhouse " +
//                        "causing an increased CO2 level")));

        /**FIND NOTE BY ID */
//        logger.info("note -> {}", repository.findNoteById(1));

        /**DELETE A NOTE*/
//        repository.deleteNote(3);
    }
}
