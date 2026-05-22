package com.sistema.sistema.Service;


import com.sistema.sistema.Domain.Cajas.Cajas;
import com.sistema.sistema.Dto.DtoCajas.CajasDto;
import com.sistema.sistema.Model.CajasRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CajasService {

    private final CajasRepository paymedRepo;

    public CajasService(CajasRepository paymedRepo) {
        this.paymedRepo = paymedRepo;
    }

    public List<CajasDto> getMethodPaymed(){
        return paymedRepo.findAllByOrderByIdDesc().stream().map(
                m-> new CajasDto(
                        m.getId(),
                        m.getName(),
                        m.getMoneda(),
                        m.getSaldo(),
                        m.getActivo()
                )
        ).toList();
    }

    public ResponseEntity<?> postCuentasCajas(CajasDto dto){
        Cajas cajas = new Cajas();

        cajas.setName(dto.getName());
        cajas.setActivo(true);
        cajas.setMoneda(Moneda.PYG);
        cajas.setSaldo(BigDecimal.ZERO);

        paymedRepo.save(cajas);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of(
                        "success", true,
                        "message", "Cuenta caja agregada correctamente",
                        "data", cajas.getId()
                ));
    }

    public ResponseEntity<?> deleteCuentasCajas(Long id){
        Optional<Cajas> opt = paymedRepo.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Map.of(
                            "success", false,
                            "message", "Caja no encontrada"
                    ));
        }

        Cajas cajas = opt.get();

            if (cajas.getSaldo().compareTo(BigDecimal.ZERO) != 0){
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(Map.of(
                                "success", false,
                                "message", "La caja tiene saldo, no puedes inactivar"
                        ));
            }

            if (cajas.getActivo()){
                cajas.setActivo(false);
            } else {
              return ResponseEntity
                      .status(HttpStatus.NOT_FOUND)
                      .body(Map.of(
                              "success", false,
                              "message", "La caja ya esta inactivada"
                              ));
            }
            paymedRepo.save(cajas);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of(
                        "success", true,
                        "message", "Cuenta caja desactivada correctamente",
                        "data", cajas.getId()
                ));

    }
}
