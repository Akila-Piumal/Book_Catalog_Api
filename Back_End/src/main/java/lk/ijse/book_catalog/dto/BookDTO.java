package lk.ijse.book_catalog.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class BookDTO {
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
