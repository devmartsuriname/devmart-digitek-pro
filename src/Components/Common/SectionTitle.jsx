

const SectionTitle = ({Title,SubTitle}) => {
    return (
        <div>
          <div className="subtitle wow fadeInUp" data-wow-delay=".2s">
            <span dangerouslySetInnerHTML={{ __html: SubTitle }} /> <img src="/assets/images/icon/fireIcon.svg" alt="icon" />
          </div>
          <h2 className="title wow fadeInUp" data-wow-delay=".4s" dangerouslySetInnerHTML={{ __html: Title }} />
        </div>
    );
};

export default SectionTitle;