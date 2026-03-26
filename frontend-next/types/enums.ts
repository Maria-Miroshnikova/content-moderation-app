export enum ESort {
    DEFAULT = -1,
    DATE,
    COST,
    PRIORITY
}

export const SORT_META: Record<
    ESort,
    { title: string, server: string }
> = {
    [ESort.DEFAULT]: { title: "Сортировать по...", server: "" },
    [ESort.DATE]: { title: "По дате", server: 'createdAt' },
    [ESort.COST]: { title: "По цене", server: 'price' },
    [ESort.PRIORITY]: { title: "По приоритету", server: 'priority' },
};

export enum ESortDirection {
    UP = 'asc',
    DOWN = 'desc'
}


export enum ECategory {
    DEFAULT = -1,
    ELECTRO = 0,
    HOMES = 1,
    TRANSPORT = 2,
    JOB = 3,
    SERVICE = 4,
    PETS = 5,
    MODA = 6,
    CHILDREN = 7
}

export const CATEGORY_META: Record<
    ECategory,
    string
> = {
    [ECategory.DEFAULT]: "Категория...",
    [ECategory.ELECTRO]
        :
        "Электроника",
    [ECategory.HOMES]
        :
        "Недвижимость",
    [ECategory.TRANSPORT]
        :
        "Транспорт",
    [ECategory.JOB]
        :
        "Работа",
    [ECategory.SERVICE]
        :
        "Услуги",
    [ECategory.PETS]
        :
        "Животные",
    [ECategory.MODA]
        :
        "Мода",
    [ECategory.CHILDREN]
        :
        "Детское"
};

/*
export const CATEGORY_DICT: Record<
    number,
    string
> = {
    0
        :
        "Электроника",
    1
        :
        "Недвижимость",
    2
        :
        "Транспорт",
    3
        :
        "Работа",
    4
        :
        "Услуги",
    5
        :
        "Животные",
    6
        :
        "Мода",
    7
        :
        "Детское"
}*/

export enum EPriority {
    HIGH,
    USUAL
}

// TODO: названия
export const PRIORITY_META: Record<
    EPriority,
    { title: string, server: string }
> = {
    [EPriority.HIGH]: { title: "Срочный", server: "urgent" },
    [EPriority.USUAL]: { title: "Обычный", server: "normal" }
}

export enum EStatus {
    INPROCESS,
    ACCEPTED,
    DECLINED,
    DRAFT
}

// TODO
export const STATUS_META: Record<
    EStatus,
    { title: string, server: string }
> = {
    [EStatus.ACCEPTED]: { title: "Одобрена", server: "approved" },
    [EStatus.INPROCESS]: { title: "На модерации", server: "pending" },
    [EStatus.DRAFT]: { title: "Возвращена", server: "draft" },
    [EStatus.DECLINED]: { title: "Отклонена", server: "rejected" },
};

export const STATUS_BY_SERVER_TITLE = Object.fromEntries(
    Object.entries(STATUS_META).map(([id, meta]) => [
        meta.server,
        Number(id)
    ])
);

export const PRIORITY_BY_SERVER_TITLE = Object.fromEntries(
    Object.entries(PRIORITY_META).map(([id, meta]) => [
        meta.server,
        Number(id)
    ])
);
