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

// TODO нужно скорее всего разделять серверные названия в отдельный словарь, т.к. строки для одного и того же ответа с сервера могут быть разные!
export const STATUS_META: Record<
    EStatus,
    { title: string, server: string, movalView?: string}
> = {
    [EStatus.ACCEPTED]: { title: "Одобрена", server: "approved" },
    [EStatus.INPROCESS]: { title: "На модерации", server: "pending" },
    [EStatus.DRAFT]: { title: "Возвращена", server: "draft", movalView: "Вернуть объявление" },
    [EStatus.DECLINED]: { title: "Отклонена", server: "rejected", movalView: "Отклонить объявление" },
};

export const STATUS_BY_SERVER_TITLE = Object.fromEntries(
    Object.entries(STATUS_META).map(([id, meta]) => [
        meta.server,
        Number(id)
    ])
);

STATUS_BY_SERVER_TITLE["requestChanges"] = EStatus.DRAFT

export const PRIORITY_BY_SERVER_TITLE = Object.fromEntries(
    Object.entries(PRIORITY_META).map(([id, meta]) => [
        meta.server,
        Number(id)
    ])
);

export enum EReason {
    NOT_SELECTED,
    FORBIDDER_ITEM,
    FALSE_CATEGORY,
    FALSE_DESCRIPTION,
    FALSE_PHOTO,
    HACKERS,
    OTHER
}

export const REASONS_META: Record<
    EReason,
    string
> = {
    [EReason.NOT_SELECTED]: "",
    [EReason.FORBIDDER_ITEM]: "Запрещенный товар",
    [EReason.FALSE_CATEGORY]: "Неверная категория",
    [EReason.FALSE_DESCRIPTION]: "Некорректное описание",
    [EReason.FALSE_PHOTO]: "Проблемы с фото",
    [EReason.HACKERS]: "Подозрение на мошенничество",
    [EReason.OTHER]: "Другое",
};
