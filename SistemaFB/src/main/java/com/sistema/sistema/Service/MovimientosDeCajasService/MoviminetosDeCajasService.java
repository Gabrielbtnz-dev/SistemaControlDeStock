package com.sistema.sistema.Service.MovimientosDeCajasService;

import com.sistema.sistema.Dto.DtoCajas.MovimientosDeCajasDto;
import com.sistema.sistema.Model.MovimientoDeCajasRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MoviminetosDeCajasService {

    private final MovimientoDeCajasRepository movimientoRepo;


    public MoviminetosDeCajasService(MovimientoDeCajasRepository movimientoRepo) {
        this.movimientoRepo = movimientoRepo;
    }

    public List<MovimientosDeCajasDto> getMovimientosDeCajas(){
            return movimientoRepo.getMovimientosDecajas();
    }
}
