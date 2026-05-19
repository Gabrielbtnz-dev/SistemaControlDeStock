package com.sistema.sistema.Service;

import com.sistema.sistema.Domain.Person.Person;
import com.sistema.sistema.Domain.Sales.ItemsSales;
import com.sistema.sistema.Domain.Sales.Sales;
import com.sistema.sistema.Dto.DtoSales.ItemsSalesDto;
import com.sistema.sistema.Dto.DtoSales.SalesDto;
import com.sistema.sistema.Model.ItemSalesRepository;
import com.sistema.sistema.Model.PersonRepository;
import com.sistema.sistema.Model.SalesRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class SalesItemsService {

    private final ItemSalesRepository itemReposi;
    private final SalesRepository SalesReposi;
    private final PersonRepository personReposi;
    /*dos variables en un solo constructor, dos repository*/
    public SalesItemsService(ItemSalesRepository itemReposi, SalesRepository salesReposi, PersonRepository personReposi) {
        this.itemReposi = itemReposi;
        SalesReposi = salesReposi;
        this.personReposi = personReposi;
    }

   public ResponseEntity<?> addSales( SalesDto dto){
       Sales sales = new Sales();
       sales.setValorTotal(dto.getValorTotal());
       sales.setValorRegularizado(dto.getValorRegularizado());
       sales.setValorPendiente(dto.getValorPendiente());
       sales.setObservaciones(dto.getObservaciones());

       Person person = personReposi.findById(dto.getidPerson())
               .orElseThrow(() -> new RuntimeException("Persona no encontrada"));

       sales.setPerson(person);

       Sales saved = SalesReposi.save(sales);

       List<ItemsSales> items = new ArrayList<>();

       if (dto.getItems() != null) {
           for (ItemsSalesDto i : dto.getItems()) {

               ItemsSales item = new ItemsSales();
               item.setPrecio(i.getPrecio());
               item.setCantidad(i.getCantidad());
               item.setValor(i.getValor());

               item.setSales(saved);

               items.add(item);
           }
       }

       itemReposi.saveAll(items);

       saved.setItems(items);

       return ResponseEntity
               .status(HttpStatus.CREATED)
               .body(Map.of(
                       "success", true,
                       "message", "Venta realizada con exito"
               ));
    }

}
