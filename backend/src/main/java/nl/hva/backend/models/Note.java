package nl.hva.backend.models;

/**
 * This method <description of functionality>
 *
 * @author Nazlıcan Eren
 */

public class Note {
    public String workfield;
    public String teamNumber;
    public String userName;
    public String timestamp;
    public String text;

    public Note(String workfield, String teamNumber, String userName, String timestamp, String text) {
        this.workfield = workfield;
        this.teamNumber = teamNumber;
        this.userName = userName;
        this.timestamp = timestamp;
        this.text = text;
    }
}
