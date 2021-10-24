package nl.hva.backend.models;

/**
 * This method <description of functionality>
 *
 * @author Nazlıcan Eren
 */

public class Note {
    public String teamNumber;
    public String userName;
    public String date;
    public String text;

    public Note(String teamNumber, String userName, String date, String text) {
        this.teamNumber = teamNumber;
        this.userName = userName;
        this.date = date;
        this.text = text;
    }
}
