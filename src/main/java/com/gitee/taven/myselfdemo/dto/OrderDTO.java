package com.gitee.taven.myselfdemo.dto;

import com.gitee.taven.myselfdemo.entity.Commodity;
import com.gitee.taven.myselfdemo.entity.Order;
import com.gitee.taven.myselfdemo.entity.SaasHouse;
import com.gitee.taven.myselfdemo.entity.TssHouse;
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
