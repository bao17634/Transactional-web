package com.byr.myselfdemo.dto;

import com.byr.myselfdemo.entity.Commodity;
import com.byr.myselfdemo.entity.Order;
import com.byr.myselfdemo.entity.SaasHouse;
import com.byr.myselfdemo.entity.TssHouse;
import lombok.Data;

import java.util.List;

/**
 * @ClassName: OrderDTO
 * @Description: TODO
 * @Author: yanrong
 * @Date: 9/6/2019 2:16 PM
 * @Version: 1.0
 */
@Data
public class OrderDTO {
    private List<Order> order;
    private Commodity commodity;
    private List<SaasHouse> saasHouse;
    private List<TssHouse> tssHouse;
    /**
     *
     */
    private String commodityCode;
}
