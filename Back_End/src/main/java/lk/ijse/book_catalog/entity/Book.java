package lk.ijse.book_catalog.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
public class Book {
    @Id
    private String bookId;
    private String bookName;
    private String Author;
    private String genre;
    private String year;
    private boolean availability;
    private String description;
    private String imgUrl;
    private double price;
}
